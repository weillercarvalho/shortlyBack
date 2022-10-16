--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer,
    email character varying(100) NOT NULL,
    password character varying NOT NULL,
    token character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "sessionId" integer,
    "userId" integer,
    url character varying NOT NULL,
    "shortUrl" character varying NOT NULL,
    token character varying NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email character varying(100) NOT NULL,
    password character varying NOT NULL,
    "confirmPassword" character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 12, 'joao@driven.com.br', '$2b$12$KgXiL5AFt4lRQXN2vO8/7u/1TwREl3zwHxIDLYQXpkGuxbl1aoWn2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZHJpdmVuLmNvbS5iciIsImlhdCI6MTY2NTYyMTE3MiwiZXhwIjoxNjY2NDg1MTcyfQ.XZIg6niOUNro0cXonTRysCN_TT_Az8h9s0r4gr3UNnM', '2022-10-12 21:32:52.447187');
INSERT INTO public.sessions VALUES (2, 12, 'joao@driven.com.br', '$2b$12$KgXiL5AFt4lRQXN2vO8/7u/1TwREl3zwHxIDLYQXpkGuxbl1aoWn2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZHJpdmVuLmNvbS5iciIsImlhdCI6MTY2NTYyMTUyMywiZXhwIjoxNjY2NDg1NTIzfQ.oFQIcNawg7iehqozIlmLMqNRx9TIwL-4vMuC-Yax9yE', '2022-10-12 21:38:43.543128');
INSERT INTO public.sessions VALUES (3, 12, 'joao@driven.com.br', '$2b$12$KgXiL5AFt4lRQXN2vO8/7u/1TwREl3zwHxIDLYQXpkGuxbl1aoWn2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZHJpdmVuLmNvbS5iciIsImlhdCI6MTY2NTYyMTUyNSwiZXhwIjoxNjY2NDg1NTI1fQ.gMHCA1OIvKL4KEke-SlddvvmqKEJel0vQG2JqMRfDSc', '2022-10-12 21:38:45.659455');
INSERT INTO public.sessions VALUES (4, 13, 'engweiller@hotmail.com', '$2b$12$QBcfRDGXqQdvXk4rm8dHaeqEuE3blrJcd8m8hHKoNtmr.8ujQ6CnG', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVuZ3dlaWxsZXJAaG90bWFpbC5jb20iLCJpYXQiOjE2NjU3Njc5NzIsImV4cCI6MTY2NjYzMTk3Mn0.vWjdPhs--FY2QKRG69FgItT4ywmX_no5v1MiFA36euc', '2022-10-14 14:19:32.640655');
INSERT INTO public.sessions VALUES (5, 14, 'nicole@driven.com.br', '$2b$12$zr0fAaRoemyhUECvF8bhLetEEkmU2U/1yEAkRlCyxEOn5gonV9WQ2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY29sZUBkcml2ZW4uY29tLmJyIiwiaWF0IjoxNjY1ODc3ODEwLCJleHAiOjE2NjY3NDE4MTB9.AXvzDwy9gQ_e_M14DaTZ7flVDCJJLfZSWmEDBtkhS_A', '2022-10-15 20:50:10.200719');
INSERT INTO public.sessions VALUES (6, 12, 'joao@driven.com.br', '$2b$12$KgXiL5AFt4lRQXN2vO8/7u/1TwREl3zwHxIDLYQXpkGuxbl1aoWn2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZHJpdmVuLmNvbS5iciIsImlhdCI6MTY2NTk0NzgxNCwiZXhwIjoxNjY2ODExODE0fQ.6ot1xnwERi0D2GfvLL_6eczRgQGrY13kjGG-wDgSzMo', '2022-10-16 16:16:54.187993');
INSERT INTO public.sessions VALUES (7, 14, 'nicole@driven.com.br', '$2b$12$zr0fAaRoemyhUECvF8bhLetEEkmU2U/1yEAkRlCyxEOn5gonV9WQ2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY29sZUBkcml2ZW4uY29tLmJyIiwiaWF0IjoxNjY1OTUwODIyLCJleHAiOjE2NjY4MTQ4MjJ9.JVbRAy4wfhvfu9CI7Coo-cwhcdNYhh53qiOQzv6Y8nc', '2022-10-16 17:07:02.037314');
INSERT INTO public.sessions VALUES (8, 12, 'joao@driven.com.br', '$2b$12$KgXiL5AFt4lRQXN2vO8/7u/1TwREl3zwHxIDLYQXpkGuxbl1aoWn2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZHJpdmVuLmNvbS5iciIsImlhdCI6MTY2NTk1MTUzOSwiZXhwIjoxNjY2ODE1NTM5fQ.Wi3S2NiaUfU1UWlxV6B2QXsFRdnAsHKIVWTlwiZx4_U', '2022-10-16 17:18:59.554988');
INSERT INTO public.sessions VALUES (9, 14, 'nicole@driven.com.br', '$2b$12$zr0fAaRoemyhUECvF8bhLetEEkmU2U/1yEAkRlCyxEOn5gonV9WQ2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY29sZUBkcml2ZW4uY29tLmJyIiwiaWF0IjoxNjY1OTUxNjEyLCJleHAiOjE2NjY4MTU2MTJ9.IaLgxrtZTc1DcR-P5fOF5HL9d51QnuM8bN3wi8VWMO4', '2022-10-16 17:20:12.002517');
INSERT INTO public.sessions VALUES (10, 12, 'joao@driven.com.br', '$2b$12$KgXiL5AFt4lRQXN2vO8/7u/1TwREl3zwHxIDLYQXpkGuxbl1aoWn2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZHJpdmVuLmNvbS5iciIsImlhdCI6MTY2NTk1MjI2NywiZXhwIjoxNjY2ODE2MjY3fQ.oe1hQ2WsejrqnH1Lf8nn0qgHNGj36En2KR0HFh_mkKY', '2022-10-16 17:31:07.277278');
INSERT INTO public.sessions VALUES (11, 14, 'nicole@driven.com.br', '$2b$12$zr0fAaRoemyhUECvF8bhLetEEkmU2U/1yEAkRlCyxEOn5gonV9WQ2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY29sZUBkcml2ZW4uY29tLmJyIiwiaWF0IjoxNjY1OTUyMzIzLCJleHAiOjE2NjY4MTYzMjN9.vBGzZMOc9PE7CbUO5Ifxf6jUe4r9p4ilC1EVDGokY14', '2022-10-16 17:32:03.107971');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (4, 4, 13, 'https://www.google.com/', 'iRtwWjwh3MUmhHtsLq4nj', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVuZ3dlaWxsZXJAaG90bWFpbC5jb20iLCJpYXQiOjE2NjU3Njc5NzIsImV4cCI6MTY2NjYzMTk3Mn0.vWjdPhs--FY2QKRG69FgItT4ywmX_no5v1MiFA36euc', 11, '2022-10-15 17:15:41.979128');
INSERT INTO public.urls VALUES (5, 4, 13, 'https://www.google.com/', 'xli3khMR7qxMS-JBWRD5I', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVuZ3dlaWxsZXJAaG90bWFpbC5jb20iLCJpYXQiOjE2NjU3Njc5NzIsImV4cCI6MTY2NjYzMTk3Mn0.vWjdPhs--FY2QKRG69FgItT4ywmX_no5v1MiFA36euc', 28, '2022-10-15 17:15:42.649648');
INSERT INTO public.urls VALUES (6, 5, 14, 'https://stackoverflow.com/questions/2421388/using-group-by-on-multiple-columns', '8A4VDfTfMdp6oyi_hJxoS', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY29sZUBkcml2ZW4uY29tLmJyIiwiaWF0IjoxNjY1ODc3ODEwLCJleHAiOjE2NjY3NDE4MTB9.AXvzDwy9gQ_e_M14DaTZ7flVDCJJLfZSWmEDBtkhS_A', 2, '2022-10-15 20:51:05.876094');
INSERT INTO public.urls VALUES (7, 7, 14, 'https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-order-by/', 'ekieGW-Ilwr3XcIV_T8g7', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY29sZUBkcml2ZW4uY29tLmJyIiwiaWF0IjoxNjY1OTUwODIyLCJleHAiOjE2NjY4MTQ4MjJ9.JVbRAy4wfhvfu9CI7Coo-cwhcdNYhh53qiOQzv6Y8nc', 0, '2022-10-16 17:15:27.807353');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (12, 'João', 'joao@driven.com.br', '$2b$12$KgXiL5AFt4lRQXN2vO8/7u/1TwREl3zwHxIDLYQXpkGuxbl1aoWn2', '$2b$12$yFRQk.6ApiPCyYdH6aF/Pe/bEWiyDYP8DKc3C3TnEsbNyoECRAo5q', '2022-10-12 19:44:50.895019');
INSERT INTO public.users VALUES (13, 'Weiller', 'engweiller@hotmail.com', '$2b$12$QBcfRDGXqQdvXk4rm8dHaeqEuE3blrJcd8m8hHKoNtmr.8ujQ6CnG', '$2b$12$.vhVcSSxxrsabbaAL8aY3OpkzoQT3AAcFoYcGDmpGR0UL.hkmIzBO', '2022-10-14 14:18:59.873368');
INSERT INTO public.users VALUES (14, 'Nicole', 'nicole@driven.com.br', '$2b$12$zr0fAaRoemyhUECvF8bhLetEEkmU2U/1yEAkRlCyxEOn5gonV9WQ2', '$2b$12$jjiNdzlDjzrqyYR9xSavT.eqqJoK.kGvSH8CCvIpHCsNjpJnjczOG', '2022-10-15 20:49:50.927854');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 11, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 7, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 14, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_sessionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES public.sessions(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

