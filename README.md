# Om

## Description
A full stack Node.js and React shopping cart app

## Live:
om.benimberman.com

## Technologies used:
![HTML5](https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/200px-HTML5_logo_and_wordmark.svg.png) ![CSS3](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/200px-CSS3_logo_and_wordmark.svg.png) ![JS](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Javascript-shield.svg/200px-Javascript-shield.svg.png) ![React](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/200px-React-icon.svg.png) ![PostgreSQL](https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/200px-Postgresql_elephant.svg.png) ![NPM](https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/200px-Npm-logo.svg.png) ![Node.js](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/200px-Node.js_logo.svg.png) ![Express.js](https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png) ![Bootstrap](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/200px-Bootstrap_logo.svg.png)

## Main Features:
* A scrollable gallery of items
* A close up view of items
* Adding items to a cart
* Viewing the cart items and summary
* Checkout view

## Demo:
https://raw.githubusercontent.com/bimberman/om/master/live-demo.gif

## System requirements
* 

## Instructions:
1. Navigate to the desired parent folder using a CLI
```
cd YOUR-DESIRED-PARENT-FOLDER-PATH
```
2. Download repo
```
git clone https://github.com/bimberman/om.git
```
3. Navigate to the folder
```
cd om
```
4. Install all dependencies using NPM
```
npm install
```
5. Rebuild the project 
```
npm run build
```
6. Verify the postgresql service is running
    1. Please note that if the postgresql service is not running, then change *status* with *start* in the following command
```
sudo service postgresql status
```
7. Copy the .env.example file and name the new file .env

8. Edit the .env file as appropriate for your setup (for exmaple if port 3000 is used by another program, then use a different port)
```
PORT=3001
DEV_SERVER_PORT=3000
DATABASE_URL=postgres://dev:lfz@localhost/om
SESSION_SECRET=secret
SESSION_EXPIRY=28800000
```
9. Start the server
```
npm run dev
```
10. Open a web browser at localhost port 3000
```
http://localhost:3000/
```
