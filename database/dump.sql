--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE ONLY public."cartItems" DROP CONSTRAINT "cartItems_pkey";
ALTER TABLE public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE public."products_productId_seq";
DROP TABLE public.products;
DROP SEQUENCE public."orders_orderId_seq";
DROP TABLE public.orders;
DROP SEQUENCE public."carts_cartId_seq";
DROP TABLE public.carts;
DROP SEQUENCE public."cartItems_cartItemId_seq";
DROP TABLE public."cartItems";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL,
    quantity integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    "imgList" text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL,
    image text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price, quantity) FROM stdin;
2	2	2	999	1
3	3	7	1295	1
4	4	7	1295	1
5	5	7	1295	1
6	6	7	1295	1
7	7	4	1095	1
8	8	2	999	1
9	9	2	999	1
10	10	2	999	1
11	10	2	999	1
12	14	1	899	1
14	12	1	899	1
13	13	1	899	1
15	11	1	899	1
16	13	2	999	1
17	13	2	999	1
18	13	2	999	1
19	13	2	999	1
20	10	2	999	1
21	10	3	1275	1
24	18	1	899	1
25	17	1	899	1
22	15	1	899	1
23	16	1	899	1
26	18	1	899	1
28	18	1	899	1
29	18	1	899	1
27	18	1	899	1
30	18	3	1275	1
31	18	3	1275	1
32	18	3	1275	1
33	18	3	1275	1
34	19	2	1099	2
35	19	2	1099	2
36	20	2	1099	2
37	21	1	1099	2
38	22	1	1099	2
39	23	1	1099	2
1	1	3	1275	3
41	25	6	1099	5
40	24	1	1099	3
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
1	2020-10-25 11:05:53.599256-07
2	2020-10-28 09:30:24.360315-07
3	2020-10-28 10:38:37.046864-07
4	2020-10-28 10:38:37.056726-07
5	2020-10-28 10:38:37.067088-07
6	2020-10-28 10:38:37.077623-07
7	2020-10-28 18:17:30.125123-07
8	2020-10-28 18:20:14.949189-07
9	2020-10-28 18:23:11.62327-07
10	2020-10-28 18:23:36.79265-07
14	2020-10-28 18:32:57.865896-07
12	2020-10-28 18:32:57.84203-07
11	2020-10-28 18:32:57.838746-07
13	2020-10-28 18:32:57.856551-07
16	2020-11-02 09:46:44.025912-08
18	2020-11-02 09:46:44.045626-08
15	2020-11-02 09:46:44.022294-08
17	2020-11-02 09:46:44.035373-08
19	2020-11-03 16:35:52.322419-08
20	2020-11-03 16:41:13.172996-08
21	2020-11-03 16:42:38.321406-08
22	2020-11-03 16:42:38.363019-08
23	2020-11-03 16:42:38.369407-08
24	2020-11-03 16:42:38.375103-08
25	2020-11-03 16:45:08.787588-08
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, "imgList", "shortDescription", "longDescription", image) FROM stdin;
1	GTF Hybrid	1099	/images/gtf-hybrid/DSC03965.jpg,/images/gtf-hybrid/DSC03967.jpg,/images/gtf-hybrid/DSC03968.jpg	A Triangle bag	A Triangle bag with zipper over a side	/images/gtf-hybrid/DSC03965.jpg
2	GTM Hybrid	1099	/images/gtm-hybrid/DSC03947.jpg,/images/gtm-hybrid/DSC03949.jpg,/images/gtm-hybrid/DSC03951.jpg	A Triangle bag	A Triangle bag with zipper over a corner	/images/gtm-hybrid/DSC03947.jpg
3	HEXF Hybrid	1099	/images/hexf-hybrid/DSC03958.jpg,/images/hexf-hybrid/DSC03960.jpg,/images/hexf-hybrid/DSC03964.jpg	A Hexagonal bag	A Hexagonal bag with zipper over a side	/images/hexf-hybrid/DSC03958.jpg
4	HEXP Hybrid	1099	/images/hexp-hybrid/DSC03952.jpg,/images/hexp-hybrid/DSC03953.jpg,/images/hexp-hybrid/DSC03954.jpg	A Hexagonal bag	A Hexagonal bag with zipper over a corner	/images/hexp-hybrid/DSC03952.jpg
5	PLB Hybrid	1099	/images/pyramid-ltd-blue/DSC03969.jpg,/images/pyramid-ltd-blue/DSC03972.jpg,/images/pyramid-ltd-blue/DSC03973.jpg	A Pyramid bag	A Pyramid bag with blue-ish fabric	/images/pyramid-ltd-blue/DSC03969.jpg
6	PLC Hybrid	1099	/images/pyramid-ltd-cork/DSC03978.jpg,/images/pyramid-ltd-cork/DSC03979.jpg,/images/pyramid-ltd-cork/DSC03980.jpg	A Pyramid bag	A Pyramid bag made with cork	/images/pyramid-ltd-cork/DSC03978.jpg
7	PLP Hybrid	1099	/images/pyramid-ltd-pink/DSC03982.jpg,/images/pyramid-ltd-pink/DSC03983.jpg,/images/pyramid-ltd-pink/DSC03984.jpg	A Pyramid bag	A Pyramid bag with pink-ish fabric	/images/pyramid-ltd-pink/DSC03982.jpg
8	PLR Hybrid	1099	/images/pyramid-ltd-rainbow/DSC03985.jpg,/images/pyramid-ltd-rainbow/DSC03986.jpg,/images/pyramid-ltd-rainbow/DSC03987.jpg	A Pyramid bag	A Pyramid bag with rainbow fabric	/images/pyramid-ltd-rainbow/DSC03985.jpg
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 41, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 25, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 1, false);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 8, true);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

