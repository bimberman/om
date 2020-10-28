require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sqlQuery = `SELECT "productId",
                           "name",
                           "price",
                           "image",
                           "shortDescription",
                           "longDescription"
                    FROM "products"
                    ORDER BY "productId"`;

  db.query(sqlQuery)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const { productId } = req.params;
  if (!productId || isNaN(parseInt(productId)) || productId < 0) {
    next(new ClientError(`Expected an integer. ${productId} is not a invalid id.`, 400));
    return;
  }

  const sqlQuery = `select *
                    from "products"
                    where "productId" = $1`;
  const value = [productId];

  db.query(sqlQuery, value)
    .then(result => {
      if (!result.rowCount) {
        next(new ClientError(`There are no records matching id: ${productId}`, 404));
        return;
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId || req.session.cartId === null) return res.status(200).json([]);
  const sqlSelectQuery = `select "c"."cartItemId",
                              "c"."price",
                              "p"."productId",
                              "p"."image",
                              "p"."name",
                              "p"."shortDescription"
                              "p"."longDescription"
                          from "cartItems" as "c"
                          join "products" as "p" using ("productId")
                          where "c"."cartId" = $1`;
  const selectValues = [req.session.cartId];
  db.query(sqlSelectQuery, selectValues)
    .then(cartItems => {
      return res.status(200).json(cartItems.rows);
    })
    .catch(err => next(err));
});

app.post('/api/cart', (req, res, next) => {
  const productId = parseInt(req.body.productId);

  if (!productId || isNaN(productId) || productId < 0) {
    next(new ClientError(`Expected a positive integer. ${productId} is not a invalid id.`, 400));
    return;
  }

  const sqlSelectQuery = `select "price"
                          from "products"
                          where "productId" = $1`;
  const selectValues = [productId];
  db.query(sqlSelectQuery, selectValues)
    .then(selectResult => {
      let sqlInsertQuery = `insert into "carts" ("cartId", "createdAt")
                            values (default, default)
                            returning "cartId"`;
      let insertValues = [];
      if (req.session.cartId && req.session.cartId !== null) {
        sqlInsertQuery = `select "cartId"
                          from "carts"
                          where "cartId" = $1`;
        insertValues = [req.session.cartId];
      }
      if (!selectResult.rowCount) {
        throw new ClientError(`There is no price listed for the item with id: ${productId}`, 400);
      }
      return db.query(sqlInsertQuery, insertValues)
        .then(insertResult => {
          return { cartId: insertResult.rows[0].cartId, price: selectResult.rows[0].price };
        })
        .catch(err => next(err));
    })
    .then(cartData => {
      req.session.cartId = cartData.cartId;
      const sqlInsertQuery = `insert into "cartItems" ("cartId", "productId", "price")
                              values ($1, $2, $3)
                              returning "cartItemId"`;
      const insertValues = [cartData.cartId, productId, cartData.price];
      return db.query(sqlInsertQuery, insertValues)
        .then(insertResult => {
          return { cartItemId: insertResult.rows[0].cartItemId };
        })
        .catch(err => next(err));
    })
    .then(insertResult => {
      const sqlInsertQuery = `select "c"."cartItemId",
                                 "c"."price",
                                 "p"."productId",
                                 "p"."image",
                                 "p"."name",
                                 "p"."shortDescription"
                              from "cartItems" as "c"
                              join "products" as "p" using ("productId")
                              where "c"."cartItemId" = $1`;
      const insertValues = [insertResult.cartItemId];
      db.query(sqlInsertQuery, insertValues)
        .then(insertResult => {
          return res.status(201).json({
            cartItemId: insertResult.rows[0].cartItemId,
            price: insertResult.rows[0].price,
            productId: insertResult.rows[0].productId,
            image: insertResult.rows[0].image,
            name: insertResult.rows[0].name,
            shortDescription: insertResult.rows[0].shortDescription
          });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {

  const { name, creditCard, shippingAddress } = req.body;
  const cartId = req.session.cartId;

  if (!cartId || cartId === null) {
    next(new ClientError('There is no shopping cart available at this moment', 400));
    return;
  }

  if (!name || name === null) {
    next(new ClientError('Please send a name in the body of your request', 400));
    return;
  }
  if (!creditCard || creditCard === null || isNaN(parseInt(creditCard))) {
    next(new ClientError('Please send a valid credit card number in the body of your request', 400));
    return;
  }
  if (!shippingAddress || shippingAddress === null) {
    next(new ClientError('Please send a shipping address in the body of your request', 400));
    return;
  }

  const sqlInsertQuery = `INSERT INTO "orders" ("cartId", "name", "creditCard", "shippingAddress")
                          VALUES ($1, $2, $3, $4)
                          RETURNING "orderId", "createdAt"`;
  const insertValues = [cartId, name, creditCard, shippingAddress];
  db.query(sqlInsertQuery, insertValues)
    .then(insertResult => {
      req.session.cartId = null;
      res.status(201).json({
        orderId: insertResult.rows[0].orderId,
        createdAt: insertResult.rows[0].createdAt,
        name: name,
        creditCard: creditCard,
        shippingAddress: shippingAddress
      });
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
