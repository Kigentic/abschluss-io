SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict E1t9YzeTsdEdAshQXttfbb2nSO2Sne1Oc6gpaYxbtvSM5cqYcNVQFLGicX6wDhs

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '04964933-1009-49dd-ab72-784ce2e36a16', 'authenticated', 'authenticated', 'io@abschluss-io.de', '$2a$10$y6QOvjnSAOytAG./3PDy7uRw0bCN9.9BEzI2hluRv808O435TVJ0i', '2026-04-22 18:43:49.633214+00', NULL, '', '2026-04-22 18:43:30.340668+00', '', NULL, '', '', NULL, '2026-05-12 08:52:00.789965+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "04964933-1009-49dd-ab72-784ce2e36a16", "email": "io@abschluss-io.de", "username": "AbschlussIO", "last_name": "Guzien", "first_name": "Christian", "industry_key": "fitness", "license_plan": "team_5", "email_verified": true, "phone_verified": false, "organization_name": "AbschlussIO", "registration_mode": "organization_signup"}', NULL, '2026-04-22 15:56:45.905929+00', '2026-05-15 12:57:21.217932+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '6808e05c-1714-425b-a6a1-1d43564917a8', 'authenticated', 'authenticated', 'digital-marketing@talkingheads.academy', '$2a$10$BDZU5aOrqTUoXKemgJAazesinF6y3oosLO4/iOu1vwhW6f2GKCbAK', '2026-03-22 14:44:24.178167+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-05-09 12:24:18.165899+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "6808e05c-1714-425b-a6a1-1d43564917a8", "email": "digital-marketing@talkingheads.academy", "username": "bernd", "last_name": "Bizeps", "first_name": "Bernd", "license_plan": "team_3", "email_verified": true, "phone_verified": false, "organization_name": "Bernds Bizeps Gym", "registration_mode": "organization_signup"}', NULL, '2026-03-22 14:43:59.81744+00', '2026-05-09 12:24:18.255549+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'af19c735-24f4-456d-b155-9bde3b3eb7b9', 'authenticated', 'authenticated', 'iphone@fitskins.de', '$2a$10$uEmKDxeynYUQprYoT3tiKu4gKH9etDY2BXA2yXWANJQkVRrd9taIS', '2026-03-23 20:40:03.947829+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-04-22 16:04:15.824917+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "af19c735-24f4-456d-b155-9bde3b3eb7b9", "email": "iphone@fitskins.de", "username": "christian", "last_name": "Guzien", "first_name": "Christian", "license_plan": "solo", "email_verified": true, "phone_verified": false, "organization_name": "AbschlussIO", "registration_mode": "organization_signup"}', NULL, '2026-03-23 20:37:58.744149+00', '2026-04-22 18:09:57.27137+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('6808e05c-1714-425b-a6a1-1d43564917a8', '6808e05c-1714-425b-a6a1-1d43564917a8', '{"sub": "6808e05c-1714-425b-a6a1-1d43564917a8", "email": "digital-marketing@talkingheads.academy", "username": "bernd", "last_name": "Bizeps", "first_name": "Bernd", "license_plan": "team_3", "email_verified": true, "phone_verified": false, "organization_name": "Bernds Bizeps Gym", "registration_mode": "organization_signup"}', 'email', '2026-03-22 14:43:59.85465+00', '2026-03-22 14:43:59.854702+00', '2026-03-22 14:43:59.854702+00', '29365aef-e89a-4d59-8c14-51679a5909c2'),
	('af19c735-24f4-456d-b155-9bde3b3eb7b9', 'af19c735-24f4-456d-b155-9bde3b3eb7b9', '{"sub": "af19c735-24f4-456d-b155-9bde3b3eb7b9", "email": "iphone@fitskins.de", "username": "christian", "last_name": "Guzien", "first_name": "Christian", "license_plan": "solo", "email_verified": true, "phone_verified": false, "organization_name": "AbschlussIO", "registration_mode": "organization_signup"}', 'email', '2026-03-23 20:37:58.818012+00', '2026-03-23 20:37:58.818611+00', '2026-03-23 20:37:58.818611+00', 'f1199752-2633-4d8d-955f-1b71f873cb9e'),
	('04964933-1009-49dd-ab72-784ce2e36a16', '04964933-1009-49dd-ab72-784ce2e36a16', '{"sub": "04964933-1009-49dd-ab72-784ce2e36a16", "email": "io@abschluss-io.de", "username": "AbschlussIO", "last_name": "Guzien", "first_name": "Christian", "industry_key": "fitness", "license_plan": "team_5", "email_verified": true, "phone_verified": false, "organization_name": "AbschlussIO", "registration_mode": "organization_signup"}', 'email', '2026-04-22 15:56:46.016041+00', '2026-04-22 15:56:46.016096+00', '2026-04-22 15:56:46.016096+00', 'abdead81-50f0-4b3e-ac5a-450be343994c');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") VALUES
	('54ec17a8-8e3f-4524-aa4d-e0cb28e1dc12', '6808e05c-1714-425b-a6a1-1d43564917a8', '2026-05-09 12:24:18.175636+00', '2026-05-09 12:24:18.175636+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', '87.122.27.39', NULL, NULL, NULL, NULL, NULL),
	('22d0909f-e7ec-4775-a0e9-b2b6f8f7c9ab', '04964933-1009-49dd-ab72-784ce2e36a16', '2026-05-12 08:52:00.790472+00', '2026-05-15 12:57:21.223462+00', NULL, 'aal1', NULL, '2026-05-15 12:57:21.223342', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/146.0.7680.151 Mobile/15E148 Safari/604.1', '87.122.27.14', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('54ec17a8-8e3f-4524-aa4d-e0cb28e1dc12', '2026-05-09 12:24:18.262133+00', '2026-05-09 12:24:18.262133+00', 'password', '0a5599f3-e939-4fd0-9f41-595210bc786e'),
	('22d0909f-e7ec-4775-a0e9-b2b6f8f7c9ab', '2026-05-12 08:52:00.858226+00', '2026-05-12 08:52:00.858226+00', 'password', '07e48b9e-3133-42cb-8e11-98fa6677bd8f');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 166, 'k6mw2j4xiphy', '6808e05c-1714-425b-a6a1-1d43564917a8', false, '2026-05-09 12:24:18.221582+00', '2026-05-09 12:24:18.221582+00', NULL, '54ec17a8-8e3f-4524-aa4d-e0cb28e1dc12'),
	('00000000-0000-0000-0000-000000000000', 167, 's3nmxhtbtjpn', '04964933-1009-49dd-ab72-784ce2e36a16', true, '2026-05-12 08:52:00.816879+00', '2026-05-12 11:10:12.047291+00', NULL, '22d0909f-e7ec-4775-a0e9-b2b6f8f7c9ab'),
	('00000000-0000-0000-0000-000000000000', 168, 'qhlghgvol5sn', '04964933-1009-49dd-ab72-784ce2e36a16', true, '2026-05-12 11:10:12.065098+00', '2026-05-12 12:29:56.552775+00', 's3nmxhtbtjpn', '22d0909f-e7ec-4775-a0e9-b2b6f8f7c9ab'),
	('00000000-0000-0000-0000-000000000000', 169, 'fnb3w2gii3zr', '04964933-1009-49dd-ab72-784ce2e36a16', true, '2026-05-12 12:29:56.575259+00', '2026-05-13 19:21:33.708023+00', 'qhlghgvol5sn', '22d0909f-e7ec-4775-a0e9-b2b6f8f7c9ab'),
	('00000000-0000-0000-0000-000000000000', 170, 'o4a5n37kktt7', '04964933-1009-49dd-ab72-784ce2e36a16', true, '2026-05-13 19:21:33.744641+00', '2026-05-14 05:16:43.457773+00', 'fnb3w2gii3zr', '22d0909f-e7ec-4775-a0e9-b2b6f8f7c9ab'),
	('00000000-0000-0000-0000-000000000000', 171, '5zba4uxia4wk', '04964933-1009-49dd-ab72-784ce2e36a16', true, '2026-05-14 05:16:43.473878+00', '2026-05-15 10:34:11.43916+00', 'o4a5n37kktt7', '22d0909f-e7ec-4775-a0e9-b2b6f8f7c9ab'),
	('00000000-0000-0000-0000-000000000000', 172, '2wsr24vakznq', '04964933-1009-49dd-ab72-784ce2e36a16', true, '2026-05-15 10:34:11.468227+00', '2026-05-15 12:57:21.188395+00', '5zba4uxia4wk', '22d0909f-e7ec-4775-a0e9-b2b6f8f7c9ab'),
	('00000000-0000-0000-0000-000000000000', 173, 'xs2tz23x3fyd', '04964933-1009-49dd-ab72-784ce2e36a16', false, '2026-05-15 12:57:21.207407+00', '2026-05-15 12:57:21.207407+00', '2wsr24vakznq', '22d0909f-e7ec-4775-a0e9-b2b6f8f7c9ab');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."organizations" ("id", "organization_name", "seat_limit", "created_at", "updated_at", "is_active", "industry_key", "prompt_profile_key", "industry_locked") VALUES
	('eab65369-3ef6-439e-828b-04b3e4acb8d3', 'Bernds Bizeps Gym', 3, '2026-03-22 14:43:59.816338+00', '2026-03-22 14:43:59.816338+00', true, 'fitness', NULL, true),
	('5f919ec1-83fc-4b29-a103-ff680a752d2c', 'AbschlussIO', 1, '2026-03-23 20:37:58.743876+00', '2026-03-23 20:37:58.743876+00', true, 'fitness', NULL, true),
	('f9bea402-2bde-4418-8dfc-ab2d32361161', 'AbschlussIO', 5, '2026-04-22 15:56:45.904714+00', '2026-04-22 15:56:45.904714+00', true, 'fitness', 'fitness', true);


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("id", "full_name", "role", "created_at", "updated_at", "first_name", "last_name", "username", "is_active", "welcome_email_sent_at") VALUES
	('6808e05c-1714-425b-a6a1-1d43564917a8', NULL, 'master_admin', '2026-03-22 14:43:59.816338+00', '2026-05-09 12:24:21.948233+00', 'Bernd', 'Bizeps', 'bernd', true, '2026-05-09 12:24:21.64+00'),
	('04964933-1009-49dd-ab72-784ce2e36a16', 'Christian Guzien', 'user', '2026-04-22 15:56:45.904714+00', '2026-05-12 08:52:46.112648+00', 'Christian', 'Guzien', 'AbschlussIO', true, '2026-04-22 19:29:06.815+00'),
	('af19c735-24f4-456d-b155-9bde3b3eb7b9', 'Christian Guzien', 'master_admin', '2026-03-23 20:37:58.743876+00', '2026-03-23 20:44:57.621275+00', 'Christian', 'Guzien', 'christian', true, NULL);


--
-- Data for Name: chat_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."chat_sessions" ("id", "user_id", "organization_id", "session_type", "title", "status", "created_at", "updated_at", "current_module", "last_announced_module", "session_difficulty", "appointment_lead_source", "complaint_channel", "audio_seconds_used", "usage_limit_reached", "limit_reason") VALUES
	('3ec701c5-8890-4dfd-97ae-bae4bc054e32', '04964933-1009-49dd-ab72-784ce2e36a16', 'f9bea402-2bde-4418-8dfc-ab2d32361161', 'full_sales', NULL, 'archived', '2026-05-09 11:04:58.522115+00', '2026-05-12 08:52:46.519206+00', 1, 1, 'almost_impossible', NULL, NULL, 0, false, NULL),
	('3957e0ec-a6e2-4437-9696-35be2f117be2', '6808e05c-1714-425b-a6a1-1d43564917a8', 'eab65369-3ef6-439e-828b-04b3e4acb8d3', 'full_sales', NULL, 'completed', '2026-03-26 19:12:57.915974+00', '2026-03-26 19:27:13.101626+00', 1, 1, NULL, NULL, NULL, 0, false, NULL),
	('c0f16d35-771f-41c2-825f-e8c29305bb9c', '6808e05c-1714-425b-a6a1-1d43564917a8', 'eab65369-3ef6-439e-828b-04b3e4acb8d3', 'appointment_setting', NULL, 'completed', '2026-03-30 14:23:30.709145+00', '2026-03-30 14:37:21.595037+00', 1, 1, NULL, NULL, NULL, 0, false, NULL),
	('bb76b586-a78e-4a97-8595-3d22d08d3e0d', '6808e05c-1714-425b-a6a1-1d43564917a8', 'eab65369-3ef6-439e-828b-04b3e4acb8d3', 'full_sales', NULL, 'active', '2026-04-01 11:47:14.591893+00', '2026-04-07 12:17:00.756512+00', 1, 1, NULL, NULL, NULL, 273, false, NULL),
	('014fc72c-62f0-47d7-a327-8d2ff677a227', '6808e05c-1714-425b-a6a1-1d43564917a8', 'eab65369-3ef6-439e-828b-04b3e4acb8d3', 'appointment_setting', NULL, 'completed', '2026-03-31 18:25:54.855328+00', '2026-03-31 18:34:15.995789+00', 1, 1, 'easy', 'Anzeige', NULL, 0, false, NULL),
	('ea695adb-93f9-4a85-80a9-5aef3e96b188', '04964933-1009-49dd-ab72-784ce2e36a16', 'f9bea402-2bde-4418-8dfc-ab2d32361161', 'full_sales', NULL, 'active', '2026-05-12 08:52:46.382472+00', '2026-05-12 11:39:25.371755+00', 1, 1, 'hard', NULL, NULL, 45, false, NULL);


--
-- Data for Name: appointment_setting_avatar_snapshots; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: appointment_setting_kpi_snapshots; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."appointment_setting_kpi_snapshots" ("id", "user_id", "organization_id", "session_id", "opening_score", "permission_score", "need_score", "benefit_score", "objection_score", "closing_score", "appointment_probability", "appointment_result", "is_appointment", "rationale", "final_feedback", "strengths", "improvements", "next_focus", "created_at", "updated_at", "feedback") VALUES
	('13bd7936-e78e-44d0-ba83-b79984e7655d', '6808e05c-1714-425b-a6a1-1d43564917a8', 'eab65369-3ef6-439e-828b-04b3e4acb8d3', 'c0f16d35-771f-41c2-825f-e8c29305bb9c', 6.00, 7.00, 7.00, 6.00, 5.00, 7.00, 75.00, 'appointment', true, 'Ein Termin wurde erfolgreich für Dienstag um 10 Uhr vereinbart, trotz der Unsicherheiten des Leads.', NULL, '[]', '[]', NULL, '2026-03-30 14:37:21.80504+00', '2026-03-30 14:37:21.80504+00', NULL),
	('74accd39-f85c-4437-890c-ddf1cb2c6d75', '6808e05c-1714-425b-a6a1-1d43564917a8', 'eab65369-3ef6-439e-828b-04b3e4acb8d3', '014fc72c-62f0-47d7-a327-8d2ff677a227', 8.00, 7.00, 8.00, 8.00, 7.00, 9.00, 90.00, 'appointment', true, 'Ein konkreter Termin wurde erfolgreich vereinbart, und der Lead zeigte Interesse und Offenheit für das Gespräch.', 'Das Gespräch war freundlich und kooperativ. Es wurden Bedenken geäußert und klärende Informationen bereitgestellt, was zu einem positiven Abschluss führte.

Was war stark?  
- Die Einwandbehandlung war zielgerichtet und empathisch.  
- Der Lead fühlte sich ernst genommen, was zu seiner Offenheit beitrug.

Was sollte verbessert werden?  
- Etwas stärkere Struktur in der Erklärung des Termins wäre hilfreich gewesen.  
- Mehr Informationen zum Ablauf des ersten Gesprächs hätten möglicherweise zusätzliche Sicherheit gegeben.', '[]', '[]', 'Achte darauf, wie du den Ablauf des Beratungsgesprächs klar und verständlich kommunizierst, um Vertrauen zu fördern.', '2026-03-31 18:34:16.202688+00', '2026-03-31 18:34:16.202688+00', NULL);


--
-- Data for Name: chat_messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."chat_messages" ("id", "session_id", "sender_type", "content", "created_at") VALUES
	('34f0f15b-05fb-4f56-af84-33b4a41dd8b9', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'user', 'Wir haben ein automatisiertes System. Zum einen ist es ja auch überhaupt nicht gesagt, dass du jeden Tag zum Training kommen musst. Ja, also zweimal die Woche ist absolut ausreichend, dreimal wäre natürlich perfekt. Aber wie gesagt, wenn du es zweimal pro Woche hinkriegst, so 45, 60 Minuten, dann ist das top. Und wir haben auch ein Tracking-System, was dich per WhatsApp automatisch daran erinnert, zum Training zu gehen, wenn du länger als fünf Tage bei uns nicht eingecheckt hast.', '2026-04-07 12:03:51.278254+00'),
	('cde60d0f-b7a2-4851-a783-f55d35499fca', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'assistant', 'Ich verstehe, dass du mit Willi ein Beispiel bringst, um zu zeigen, dass Fortschritte möglich sind, wenn man konsequent dranbleibt. Und ich sehe, dass das für viele funktioniert. Aber ich mache mir beim Thema Knie wirklich Gedanken. Manchmal habe ich einfach das Gefühl, dass ich mit meiner Erschöpfung nicht klarkomme oder dass ich vielleicht nicht die richtige Motivation aufbringe. Ich möchte nicht wieder in ein Programm investieren und dann scheitern. Daher bin ich mir unsicher, ob ich wirklich bereit bin, das jetzt zu starten.', '2026-04-07 12:17:11.081574+00'),
	('4fe2837e-87d0-4220-9e68-fa098815ab23', '3ec701c5-8890-4dfd-97ae-bae4bc054e32', 'assistant', 'Hallo, ich bin Jan. Ich will direkt ehrlich sein: anhaltende Kniebeschwerden nach langen Arbeitstagen nervt mich zwar, aber ich bin gerade kaum ueberzeugt, dass so ein Gespraech fuer mich wirklich etwas veraendert.', '2026-05-09 11:04:59.48391+00'),
	('ab62258c-728c-434d-8171-e502949f490d', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'assistant', 'Hi, ich bin Markus, 51, selbstständiger Handwerker. Mein rechtes Knie macht mir seit Monaten immer mehr Probleme, vor allem nach langen Arbeitstagen. Ich würde gern wieder belastbarer werden und ein bisschen abnehmen, habe aber Sorge, dass Training das Knie eher noch mehr reizt.

Du kannst das Gespräch gerne beginnen.', '2026-04-01 11:47:15.582166+00'),
	('adf36897-6589-448e-962d-9948b820ca48', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'assistant', 'Das klingt sehr hilfreich, besonders die Erinnerungen über WhatsApp. Ich habe oft einen vollen Terminkalender und vergesse dann leicht, mir Zeit für mich selbst zu nehmen. Wenn ich eine Art Unterstützung bekomme, um dran zu bleiben, könnte das wirklich helfen, motiviert zu bleiben. Ich finde das Prinzip der zwei bis drei Mal die Woche auch gut, das sollte sich gut in meinen Alltag integrieren lassen. Aber trotzdem habe ich Bedenken, dass ich vielleicht beim Training nicht die nötige Disziplin aufbringen kann oder dass ich Angst habe, die Übungen nicht richtig ausführen zu können. Wie geht ihr mit solchen Bedenken um?', '2026-04-07 12:03:56.807451+00'),
	('03972c28-ad68-4981-b2a8-5164f9333c67', '3ec701c5-8890-4dfd-97ae-bae4bc054e32', 'user', 'Hallo Jan, schön dich kennen zu lernen. Ich bin der Christian verrate mir doch bitte als Einstieg noch mal ganz kurz. Wie alt bist du denn und was machst du beruflich?', '2026-05-09 11:06:47.321387+00'),
	('ebb1fa51-a8db-4e3c-b965-dcc48d48507b', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'user', 'Hallo Markus, schön dass wir uns heute hier treffen. Erzähl doch mal was machst du da beruflich genau ? Also weil Du ja Knieprobleme hast.', '2026-04-01 11:48:32.648198+00'),
	('4ccb6bbb-e280-4ab2-8559-67114adee210', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'user', 'wir erstellen dir natürlich einen kostenlosen Trainingsplan. Wir haben natürlich auch geschultes Personal, was sich um dich kümmert und wir bieten dir auch gerne, wenn du dich für uns entscheidest, erstmal zwei Monate gratis an.', '2026-04-07 12:04:43.012383+00'),
	('8eb38512-8e1f-46fb-bf21-27fe47d27799', 'ea695adb-93f9-4a85-80a9-5aef3e96b188', 'assistant', 'Hallo, Sabine hier. Ich schaue zwar nach einer Loesung fuer unsicherheit nach künstlicher hüfte, aber ehrlich gesagt bin ich bei zeit und schlechte vorerfahrung ziemlich skeptisch.', '2026-05-12 08:52:46.771068+00'),
	('3bf2a221-9814-42d4-9e55-591bd9b6f6d1', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'assistant', 'Ich bin selbstständiger Handwerker und arbeite viel im Bauwesen. Das bedeutet, ich bin den ganzen Tag auf den Beinen, hebe und trage Materialien, arbeite in verschiedenen Positionen. Die körperliche Belastung ist echt hoch, und nach langen Arbeitstagen merke ich mein Knie immer stärker. Es ist frustrierend, weil ich so nicht lange machen kann, wenn das so weitergeht. Ich möchte einfach wieder unbeschwert arbeiten können.', '2026-04-01 11:48:39.539575+00'),
	('3eaf3508-ab2c-48bf-a44b-f1ae005ec3bd', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'assistant', 'Das sagen irgendwie alle Fitnessstudios. Ein kostenloser Trainingsplan klingt gut, aber ich bin skeptisch, ob das wirklich auch in der Praxis so gut umgesetzt wird. Ich habe in der Vergangenheit oft die Erfahrung gemacht, dass solche Angebote manchmal eher leere Versprechen sind. Glaubt ihr wirklich, dass ich bei euch die Unterstützung bekomme, die ich brauche, um durchzuhalten? Was passiert, wenn ich nach diesen zwei Monaten keine Fortschritte sehe?', '2026-04-07 12:04:51.838379+00'),
	('a94513a9-5628-4d72-b611-ecc9c78b7ca3', 'ea695adb-93f9-4a85-80a9-5aef3e96b188', 'user', 'Hallo Sabine, freut mich, dass wir uns hier heute im Studio treffen. Verrat doch mal ein bisschen was über dich. Was machst du beruflich? Wie alt bist du? Wie sieht dein Alltag so aus? Einfach, damit ich das Ganze mal ein bisschen besser kennenlerne.', '2026-05-12 08:54:01.289576+00'),
	('39d3e2f6-d985-48f8-8a2b-ca5a60a9634c', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'user', 'Ok, klar. Das kann ich mir denken. Grade ein Gelenk wie das Knie ist da super anfällig. Grade wenn man selbst die Kombination aus dem einen oder anderen Pfund zu viel auf den Rippen mitbringt und auch noch wenig Muskulatur hat, die das Gelenk stützt.', '2026-04-01 11:49:53.647065+00'),
	('497c3abf-ddf0-46af-a867-674051a6eec8', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'user', 'Also grundsätzlich, wenn man, und das ist natürlich der Part, der bei dir liegt, regelmäßig zum Training kommt und auch das befolgt, was auf dem Plan steht, dann wird man Fortschritte machen. Das ist ganz einfach, dafür ist unser Körper angelegt. Wenn er mit Gewichten belastet wird, passt er sich an. Aber jetzt habe ich mal eine andere Frage. Bist du denn grundsätzlich erstmal interessiert, die Sache hier seriös und nachhaltig anzugehen?', '2026-04-07 12:07:15.514881+00'),
	('1b7116a7-1dae-4f3a-bdc3-e4fe0d2d2959', 'ea695adb-93f9-4a85-80a9-5aef3e96b188', 'assistant', '*Sabine schaut nachdenklich und überlegt, wie sie ihre Situation schildern soll.* 

Ich bin 46 Jahre alt und habe mich vor kurzem in den Ruhestand verabschiedet, bin alleinerziehend und selbstständig gewesen. Mein Alltag war bisher sehr geschäftig, aber nach meinem medizinischen Eingriff zur künstlichen Hüfte fühle ich mich etwas unsicher, vor allem, wenn es um Bewegung und Fitness geht. Ich möchte wieder aktiv werden, aber ich habe Angst, zu übertreiben oder etwas falsch zu machen.', '2026-05-12 08:54:08.115716+00'),
	('696e2961-7795-46ee-84e1-c417496c34b7', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'assistant', 'Genau, genau das ist mein Punkt. Ich habe in der letzten Zeit auch zugenommen, und ich merke, dass das mein Knie zusätzlich belastet. Ich möchte unbedingt abnehmen, aber gleichzeitig sorgen, dass ich mein Knie nicht überlasten. Ich denke, ich brauche Unterstützung, um das richtig anzugehen und gleichzeitig meine Muskulatur zu stärken, ohne das Knie zu strapazieren. Es ist ein Balanceakt, und ich fühle mich unsicher, wie ich das am besten umsetzen kann.', '2026-04-01 11:49:59.041995+00'),
	('7fe3cb0b-462d-48f7-8e6b-2e06f5f32e47', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'assistant', 'Ich bin definitiv interessiert daran, die Sache ernsthaft anzugehen. Ich möchte endlich etwas gegen meine Kniebeschwerden tun und gleichzeitig abnehmen, um belastbarer zu werden. Aber wie gesagt, ich habe auch Zweifel, ob ich das durchhalte und die Unterstützung bekomme, die ich brauche. Das Gefühl von Überforderung oder dass ich nicht genug Fortschritte mache, macht mir wirklich Sorgen. Ich will nicht in eine andere Enttäuschung geraten.', '2026-04-07 12:07:19.305231+00'),
	('e0afe2e4-bcd9-4c7e-b483-e0385f23a1f4', 'ea695adb-93f9-4a85-80a9-5aef3e96b188', 'user', 'Oh, alles klar. Jetzt verstehe ich das. Ja, vor allen Dingen nach einer künstlichen Hüfte ist es natürlich wichtig, wieder reinzukommen, dass du, ja, sagen wir mal, die Vorteile eines neuen Gelenks mit neuer Bewegung und Schmerzfreiheit hier komplett voll geniessen kannst. Mir jetzt mal eben die Frage, ist die Reha schon abgeschlossen?', '2026-05-12 11:39:29.531783+00'),
	('d8230e4e-f49f-4460-aab2-952ce4389b46', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'user', 'Sag mal hast du generell schonmal krafttraining oder muskeltraining gemacht oder wäre das jetzt für dich sozusagen der einstieg ? Das hilft mir auch dir realitisch sagen zu können wie schnell du eine verbesserung merkst.', '2026-04-01 11:51:03.527966+00'),
	('4e5e4aa8-4dcf-4f48-86f5-a7ccef4b37f5', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'user', 'Guck mal, Markus, dann habe ich doch jetzt folgende Idee. Dann lass uns das doch so machen. Wir starten heute zum Preis von 79,90 pro Monat, legen das Ganze, damit es auch wirklich nachhaltig ist, auf 12 Monate an, aber du bekommst von mir einen Sicherheitsanker von sechs Wochen. Das heißt, wenn du nach sechs Wochen wirklich sagst, mein Knie ist noch genauso schlimm wie vorher, das Training macht mir überhaupt keinen Spaß, dann können wir das Ganze auch gerne wieder beenden. Wie sieht es aus?', '2026-04-07 12:08:47.4437+00'),
	('7103e28f-8de1-4cb0-a5ae-05a8493f0ce4', 'ea695adb-93f9-4a85-80a9-5aef3e96b188', 'assistant', '*Sabine nickt leicht, aber wirkt ein wenig unsicher.* 

Ja, die Reha ist abgeschlossen, aber ich fühle mich immer noch etwas unsicher, was die richtigen Bewegungen angeht. Ich habe das Gefühl, dass ich Unterstützung brauche, um sicher und selbstbewusst wieder aktiv zu werden. Ich möchte einfach nichts falsch machen.', '2026-05-12 11:39:36.574363+00'),
	('9c50f857-1567-4f80-9297-ffeab08a3924', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'assistant', 'Ich habe in der Vergangenheit mal ein bisschen trainiert, aber das ist schon eine Weile her. Es war hauptsächlich im Rahmen von Fitnesskursen, aber nie wirklich gezielt auf Muskulaturaufbau ausgerichtet. Ich habe mittlerweile das Gefühl, dass ich aufgrund der Knieprobleme etwas vorsichtiger sein muss. Es wäre für mich also eigentlich ein Wiedereinstieg, wobei ich echt unsicher bin, wie ich das genussvoll gestalten kann, ohne mein Knie noch mehr zu belasten.', '2026-04-01 11:51:08.194728+00'),
	('355c2ced-34fd-4578-9ad1-ee3459915f67', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'assistant', 'Ich verstehe, dass ihr mir mit dem Sicherheitsanker eine Möglichkeit bietet, das Risiko zu minimieren, und das klingt fair. Aber ich mache mir immer noch Gedanken über den Preis und ob ich wirklich die nötige Disziplin aufbringen kann, um regelmäßig zu kommen. Ich habe in der Vergangenheit oft den inneren Schweinehund überwinden müssen. Was, wenn ich nach ein paar Wochen einfach keinen Anreiz mehr habe, weiterzumachen?', '2026-04-07 12:08:50.836853+00'),
	('d56563da-f843-4481-aa60-052f8fe25ed2', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'user', 'Okay, habe ich verstanden. Und die Lösung sieht hier tatsächlich so aus. Nicht schonen, sondern kontrolliert belasten. Mit der absoluten Betonung auf kontrolliert. Du brauchst Muskulatur um das Knie herum, also sowohl im Oberschenkel als auch in der Wade, um das Knie zu stabilisieren, zu stützen, die passiven Strukturen zu entlasten. aber natürlich mit Übungen, die für dich passen, die nicht weh tun, die du ausführen kannst. Und genau dafür machen wir dir dann eben einen Plan.', '2026-04-07 12:00:43.971368+00'),
	('d22575c6-1215-40ce-8104-7f69d5bc3a2a', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'user', 'Ganz ehrlich, dann willst du nichts ändern. Und bist jetzt hier und hast den Anreiz, weiterzumachen. Wenn du den aber nach ein paar Wochen verlierst, dann können die Schmerzen und die Probleme im Knie gar nicht so schlimm sein.', '2026-04-07 12:09:35.599504+00'),
	('7d802619-c0c0-442a-88e5-0e4f9136a279', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'assistant', 'Das klingt auf jeden Fall sinnvoll. Ich verstehe, dass es wichtig ist, die Muskulatur um das Knie herum zu stärken, um Schmerzen zu reduzieren und die Belastbarkeit zu erhöhen. Aber ich mache mir immer noch Sorgen, ob ich das selbst wirklich durchhalten kann. Ich möchte nicht enttäuscht werden oder das Gefühl haben, dass ich überfordert bin. Wie stellt ihr sicher, dass der Plan an meinen Bedürfnissen und Möglichkeiten ausgerichtet ist?', '2026-04-07 12:00:53.536331+00'),
	('a0365944-6750-4a62-9667-8a1fae85afdb', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'assistant', 'Ich verstehe deinen Punkt, und ich möchte auf jeden Fall etwas ändern. Es ist nur, dass ich auch festgestellt habe, dass die Motivation manchmal schwanken kann, besonders wenn ich mit meinen kniespezifischen Einschränkungen zu kämpfen habe. Ich will nicht vor einer Herausforderung kapitulieren, aber ich kann gut nachvollziehen, dass es jedem bei einem Neuanfang so geht. Ich denke, ich brauche einfach ein wenig mehr Überzeugung, dass ich in eurem Programm die Unterstützung und den Rückhalt bekomme, die nötig sind, um dran zu bleiben.', '2026-04-07 12:09:39.909251+00'),
	('7f1f82d8-a951-4dbb-b067-4ec8468ea5ac', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'assistant', 'Hallo, ich bin Peter, 68 und war frueher eigentlich immer recht aktiv. Inzwischen merke ich aber deutlich, dass mir Beweglichkeit, Kraft und Ausdauer fehlen. Ich will gesundheitlich vorbeugen und moechte nicht erst reagieren, wenn es irgendwann wirklich ernst wird, bin aber unsicher, was in meinem Alter noch sinnvoll ist.

Du kannst das Gespraech gerne beginnen.', '2026-03-26 19:12:58.054386+00'),
	('4d2f701a-f861-4360-b3b2-4a489728f890', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'user', 'Hallo Peter, ich bin der Christian. Freut mich erstmal, dass du mit deinen rüstigen, stolzen 68 Jahren den Weg hier zu uns ins Studio gefunden hast. Absoluten Respekt erstmal dafür und auch dafür, dass du selber erkannt hast, dass du hier gesundheitlich vorbeugen möchtest. Jetzt als allererstes mal die Frage an dich, so zum aktuellen Status. Bist du gerade sozusagen noch komplett fit oder gibt es eventuell schon so die eine oder andere Baustelle, wo du merkst, ist nicht mehr so ganz wie früher?', '2026-03-26 19:14:32.021479+00'),
	('5b99a7d9-5f4b-4f4f-8582-3c83273f14eb', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'assistant', 'Danke, Christian. Ja, ich habe schon einige Baustellen. Ich merke, dass meine Gelenke manchmal schmerzen, vor allem nach längerem Sitzen, und ich habe auch öfter Rückenschmerzen, besonders nach dem Gartenarbeit oder beim Heben von etwas Schwerem. Ich fühle mich nicht mehr so beweglich wie früher und merke auch, dass ich schnell aus der Puste komme, wenn ich mich aktiv bemühe. Ich möchte einfach wieder mehr Energie und Wohlbefinden bekommen und etwas für meine Gesundheit tun.', '2026-03-26 19:14:37.393835+00'),
	('6f8a612a-8ad1-4437-8440-bfeb396c7fbc', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'user', 'Okay, dann haben wir auf jeden Fall ja schon mal was, wo wir ansetzen können. Jetzt zweite wichtige Frage für mich an der Stelle. Hast du schon mal in irgendeiner Form Sport gemacht oder eben auch Krafttraining betrieben oder bist du jetzt quasi sozusagen kompletter Neueinsteiger?', '2026-03-26 19:15:20.948745+00'),
	('f61dec44-eb9f-4d42-8d1a-66c6ec8f9d8d', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'assistant', 'Ich habe in meiner Jugend viel Sport gemacht, vor allem Fußball und Tennis. Später bin ich auch mal ins Fitnessstudio gegangen, aber das ist schon lange her. In den letzten Jahren war ich allerdings nicht mehr regelmäßig aktiv und fand den Weg zurück zum Sport immer schwieriger. Ich fühle mich jetzt wie ein Neueinsteiger. Ich möchte aber gerne wieder etwas anfangen, um meine Fitness zu verbessern.', '2026-03-26 19:15:24.381943+00'),
	('c5df757b-00f5-4923-a941-f78d240aa654', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'user', 'Also warst du ja in der Vergangenheit nicht komplett unsportlich. Fußball und Tennis ist ja auch richtig cool. Und wenn du schon mal im Fitnessstudio warst, dann ist das ja alles nicht mehr ganz so neu für dich. Aber jetzt interessiert mich trotzdem nochmal, warum hast du aufgehört zu trainieren? Hat dir das nicht gut getan? Hat irgendwas nicht funktioniert? Warst du unzufrieden?', '2026-03-26 19:16:10.377109+00'),
	('ef4fcd05-3688-465b-8b75-f62a6bcf0d5c', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'assistant', 'Das Training hat mir damals tatsächlich gut getan, ich hatte Spaß daran. Aber mit der Zeit kamen die beruflichen Verpflichtungen und wenig Zeit für mich selbst. Auch das Alter hat seinen Teil dazu beigetragen, ich war oft müde. Irgendwann kam dann auch die eine oder andere Verletzung hinzu, die mich davon abgehalten hat, regelmäßig aktiv zu bleiben. Es war eine Kombination aus Zeitmangel, körperlichen Beschwerden und dem Gefühl, dass es einfach nicht mehr so einfach funktioniert wie früher. Jetzt fühle ich mich bereit, wieder etwas für meine Gesundheit zu tun, aber ich bin mir unsicher, wie ich es am besten angehe.', '2026-03-26 19:16:15.047437+00'),
	('31a0c156-745c-4df8-a058-bf49ee977cb6', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'user', 'Okay, alles klar. Und um dir die Unsicherheit zu nehmen, deswegen sind wir ja hier. Aber das finde ich schon mal positiv, dass du auch gemerkt hast, dass dir das gut getan hat. Und dann wollen wir natürlich auch alles wieder daran setzen, dir dieses Gefühl wieder zurückzubringen. Jetzt natürlich die Frage, du hast ja Zeitmangel erwähnt, wie sieht es aktuell mit deinem Zeitbudget aus? Sind zwei Tage Training für dich so a 45, 60 Minuten realistisch?', '2026-03-26 19:17:08.417311+00'),
	('9facfba3-2998-4af3-bc9a-5d35f5a891c3', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'assistant', 'Ja, ich denke, zwei Tage pro Woche für jeweils 45 bis 60 Minuten sind realistisch für mich. Das sollte ich irgendwie hinbekommen, auch wenn ich manchmal spontan bin. Ich verstehe, dass Konsistenz wichtig ist, um Fortschritte zu erzielen, und ich bin bereit, das in meinen Alltag zu integrieren. Es wäre schön, wieder regelmäßige Bewegung zu haben.', '2026-03-26 19:17:11.934828+00'),
	('b0af7248-32ec-462e-a719-c7f66881cbe7', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'user', 'Ja, natürlich. Vor allen Dingen die Regelmässigkeit spielt hier natürlich eine ganz, ganz wichtige Rolle. Aber wenn zweimal pro Woche 45 bis 60 Minuten okay sind, ist das schon mal das Wichtigste. Was ist dir denn bei einer Betreuung, bei einem Training oder bei deinem Vorhaben, das jetzt wieder anzugehen, sonst noch wichtig?', '2026-03-26 19:18:02.325769+00'),
	('90017565-395f-49ce-8ef4-713e6d5970dd', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'assistant', 'Mir ist es wichtig, dass ich eine angemessene Anleitung und Unterstützung bekomme, vor allem, um Verletzungen zu vermeiden. Ich möchte auch, dass die Übungen auf meine Bedürfnisse und Einschränkungen abgestimmt sind, wo ich mir nicht mehr so viel zutraue. Außerdem wäre es schön, in einer freundlichen Atmosphäre zu trainieren, wo ich mich wohlfühle und mit anderen Menschen austauschen kann. Motivation und positive Erfahrungen sind für mich ebenfalls wichtig, damit ich dranbleiben kann.', '2026-03-26 19:18:06.300081+00'),
	('8715983f-102a-41fa-9ff7-fe036de5cda2', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'user', 'Ja, das sollte definitiv auch wichtig sein. Und da kann ich dir versichern, dass wir selber hier auch sehr, sehr grossen Wert darauf legen, dass wir nicht nur einen Trainingsplan schreiben und die Leute dann auf die Trainingsfläche schicken und sie quasi sich selbst überlassen. Ja, also regelmäßige Checks und auch Kontrollen während des Trainings gehören für uns natürlich hier absolut dazu. Und ja, wir pflegen selber eine sehr freundliche Atmosphäre. Wir legen auch Wert darauf, hier nicht anonym zu sein oder Kunden anonym zu behandeln. Und ich glaube, der Erfolg bei unseren Mitgliedern gibt uns da auch ein Stück weit recht.', '2026-03-26 19:19:16.810248+00'),
	('5a8b7cc9-4f45-4bf0-a78b-4c6e49d6784f', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'assistant', 'Das klingt sehr vielversprechend und stimmt mich positiv. Ich finde es beruhigend, dass ihr auf die individuelle Betreuung Wert legt und dass man nicht einfach allein gelassen wird. Das ist für mich sehr wichtig, um sicherzustellen, dass ich die Übungen richtig ausführe und Fortschritte mache. Diese Atmosphäre, die du beschreibst, klingt auch nach einem Ort, an dem ich mich wohlfühlen könnte. Aber ich habe noch ein bisschen Bedenken, ob ich es wirklich durchziehen kann und ob die Motivation aufrecht bleibt, besonders zu Beginn.', '2026-03-26 19:19:21.307109+00'),
	('c5b15ad1-ad2a-43d2-bd0b-60d1622286ad', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'user', 'Das ist doch gut. Was mich jetzt natürlich auch noch interessieren würde, hast du dir hinsichtlich Betreuung, Konzept, Mitgliedschaft etc. schon mal Gedanken gemacht? Hast du dir ein Budget gesetzt, irgendwas in der Art?', '2026-03-26 19:20:19.198552+00'),
	('46ee7e8a-5264-4067-a371-ed0e89ffb263', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'assistant', 'Ich habe darüber nachgedacht, aber ich habe noch keine konkreten Zahlen im Kopf. Ich möchte einfach sicherstellen, dass ich für eine gute Betreuung und ein passendes Konzept investiere, das auch langfristig funktioniert. Mir ist vor allem die Qualität der Betreuung wichtiger als der Preis. Ich bin bereit, in meine Gesundheit zu investieren, aber ich möchte trotzdem sicherstellen, dass es auch das Richtige für mich ist. Bei den Kosten bin ich also noch unentschlossen.', '2026-03-26 19:20:22.558918+00'),
	('2a9c0afb-391c-4f9a-9266-5b238c9da44b', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'user', 'Okay, verstehe. Wie würde denn deiner Meinung nach so eine Überzeugung aussehen? Was brauchst du konkret an Überzeugung, damit du dir sicher bist?', '2026-04-07 12:10:36.853231+00'),
	('76928ffd-1f16-4046-a9d3-cb88c1bb6af6', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'user', 'Okay, dann habe ich eine Idee. Also grundsätzlich sieht es so aus, dass wir alle drei Monate erstmal einen grundsätzlichen Check-up mit unseren Kunden machen, wo wir eben auch sicherstellen, dass sie quasi on track sind und Fortschritte machen. Das würden wir jetzt natürlich hier als allererstes bei dir zum Einstieg auch machen. Und auf der Basis und auf der Basis eben deiner Ziele, die du ja hier schon geäußert hast, erstellen wir eben das Trainingskonzept, was für dich natürlich dann hier auch zeitlich passt. Also, wir werden dich da nicht überfordern. Wir werden aber auch dafür sorgen, dass du regelmäßig dranbleibst. Und ja, du hast jetzt eine gewisse Zeit lang nichts gemacht. Also ich würde das Ganze schon auf einen Zeitraum von Minimum mal 12 Monaten ansetzen. Und dann sieht es so aus, dass wir für den initialen Check-up einmalig 99 Euro nehmen und monatlich wärst du dann bei der 12-monatigen Laufzeit mit 69,90 dabei.', '2026-03-26 19:21:56.213747+00'),
	('fb7dd27c-243f-4b9c-ad23-66127a684aa7', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'assistant', 'Das klingt interessant und ich schätze die Idee mit dem regelmäßigen Check-up. Trotzdem muss ich sagen, dass ich mir bei der langen Laufzeit von 12 Monaten unsicher bin. Ich möchte mich nicht festlegen, ohne zu wissen, wie es mir dabei wirklich geht und ob ich die Motivation behalte. Ich habe in der Vergangenheit schon einige Male Mitgliedschaften abgeschlossen und es dann nicht durchgezogen. Das macht mich etwas vorsichtig. Ist es möglich, die Mitgliedschaft auf kürzere Zeiträume aufzuteilen?', '2026-03-26 19:21:59.708437+00'),
	('abd93811-dee5-4800-b1fb-592b7ca89620', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'user', 'Naja, die Frage ist ja viel eher, welche Sicherheit brauchst du? Oder welche Information ist dir letztendlich noch wichtig, um zu sagen, okay, ich bin auch mit den 12 Monaten fein.', '2026-03-26 19:22:44.100969+00'),
	('e573ccd2-af56-4070-923b-3786ab5df7b1', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'assistant', 'Ich denke, es wäre hilfreich für mich zu wissen, wie flexibel ich während der Mitgliedschaft bin, falls ich merke, dass das Training nicht zu mir passt oder ich aus anderen Gründen nicht mehr kommen kann. Gibt es zum Beispiel eine Möglichkeit, das Training vorher auszusetzen oder zu pausieren? Auch Informationen über die Fortschritte, die ich in diesen 12 Monaten erwarten kann, wären für mich wichtig. Andererseits würde ich gerne wissen, was passiert, wenn ich Schwierigkeiten habe, regelmäßig zu trainieren.', '2026-03-26 19:22:47.584638+00'),
	('8551d698-6c8c-46d1-ac0a-f8bd503fe799', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'user', 'Also, flexibel in der Hinsicht bist du natürlich, dass du immer deine Mitgliedschaft pausieren kannst, minimum eben für einen Zeitraum von vier Wochen. Das hängen wir natürlich dann immer wieder hinten dran, aber wenn es dir jetzt mal nicht möglich sein sollte, eine Mitgliedschaft, also regelmäßig zum Training zu kommen, kannst du uns ganz kurze Info geben und dann pausieren wir die Mitgliedschaft eben, also minimum für vier Wochen. Und was die Fortschritte angeht, du bekommst jedes Mal, wenn wir diesen Check-up machen, also initial und dann alle drei Monate, auch immer eine Auswertung. Ja, wir haben das früher im Papier gemacht, wir machen das jetzt elektronisch als PDF in deine Mail, wo du deine Kraftwerte siehst, wo du die Veränderung deiner Zellaktivität siehst, deinen Körperfettanteil siehst. Also kannst du eben, ja, so einen kleinen Ordner anlegen und regelmäßig da reingucken und sehen, was du hier in der Zeit schon für Fortschritte machst und was du schon erreicht hast. Wäre das für dich okay?', '2026-03-26 19:24:19.38647+00'),
	('2d5fedb7-9df2-4715-8fcf-67e3838b9540', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'assistant', 'Das klingt schon viel besser und gibt mir mehr Sicherheit. Die Möglichkeit, die Mitgliedschaft zu pausieren, ist sehr beruhigend, und ich finde es großartig, dass ich regelmäßig Auswertungen zu meinen Fortschritten erhalte. Das hilft mir, motiviert zu bleiben und zu sehen, dass ich etwas erreiche. Ich denke, das wäre für mich ein guter Anfang, um meine Fitness wieder zu verbessern. Aber ich denke, ich muss noch darüber nachdenken, bevor ich eine endgültige Entscheidung treffe.', '2026-03-26 19:24:22.602175+00'),
	('9d751d1f-ed3a-4ca1-b1e7-3317190c790b', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'user', 'Okay, du musst darüber nachdenken. Dann bin ich jetzt einfach mal ganz direkt und frage, was aus deiner Sicht jetzt ganz konkret ehrlich und aufrichtig dagegen spricht, heute zu sagen, jawohl, ich möchte präventiv was machen. Ich möchte nicht rosten, sondern ich möchte in meinem Alter locker mal für die nächsten 20 Jahre noch fit, beweglich und kraftvoll sein. Was würde heute konkret noch dagegen sprechen? Über was musst du konkret nachdenken?', '2026-03-26 19:25:26.379583+00'),
	('21fe03b6-3871-4bc6-9eec-730c42ea2971', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'assistant', 'Um ehrlich zu sein, ich mache mir immer noch Gedanken über die langfristige Verpflichtung von 12 Monaten. Ich weiß, dass ich bereit bin, etwas für meine Gesundheit zu tun, aber die Vorstellung, mich für so lange zu binden, macht mich unsicher. Ich habe in der Vergangenheit bereits negative Erfahrungen mit Mitgliedschaften gemacht, die ich nicht durchgehalten habe. Auch die anfängliche Investition möchte ich gut überdenken. Es ist eine große Entscheidung für mich, die nicht nur von meinem aktuellen Eindruck abhängt, sondern auch davon, ob ich es schaffe, die Motivation und den Willen für das Training aufrechtzuerhalten.', '2026-03-26 19:25:32.118459+00'),
	('a6cdae6b-2f33-4977-a398-8c5d09bbf662', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'user', 'Okay, also, mein Vorschlag. wir machen das mit den 12 Monaten und ich gebe dir sozusagen eine Zufriedenheitsgarantie von sechs Wochen. Das heißt, wenn du nach sechs Wochen sagst, das ist nicht mein Ding, mir gefällt das Training doch nicht, ich schaffe es zeitlich nicht oder es ist irgendwas anderes, dann kannst du nach sechs Wochen kommen und Bescheid sagen und wir vergessen die ganze Geschichte. Ich glaube nicht, dass das passieren wird, aber das wäre für dich so eine Art Rettungsanker, dass du wirklich sagen kannst, okay, ich kann hier wirklich sechs Wochen mal trainieren, kann mir das alles angucken, kann die Atmosphäre kennenlernen und so weiter. Und wenn ich dann nach sechs Wochen wirklich nicht überzeugt bin, dann vergessen wir das Ganze. Wie klingt das für dich? Haben wir einen Deal?', '2026-03-26 19:26:41.719588+00'),
	('64359a28-290a-4502-8302-ff86bd168232', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'assistant', 'Das klingt nach einem fairen Angebot und gibt mir ein gutes Gefühl. Die Zufriedenheitsgarantie von sechs Wochen ist für mich wirklich ein beruhigender Punkt. So kann ich ganz unbeschwert starten und mir alles in Ruhe anschauen, ohne gleich festgelegt zu sein. Ich denke, ich bin bereit, das auszuprobieren und die ersten Schritte in Richtung mehr Bewegung und Gesundheit zu gehen.', '2026-03-26 19:26:46.002686+00'),
	('7df9dbd6-f341-45f1-abae-42025595fe14', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'user', 'Ja super, alles klar, dann mache ich jetzt den Papierkram. Herzlich willkommen.', '2026-03-26 19:27:07.898343+00'),
	('ca180e4e-c42d-48c1-976a-630acf8728dc', '3957e0ec-a6e2-4437-9696-35be2f117be2', 'assistant', 'Das freut mich sehr, Peter! Ich bin begeistert, dass du diesen Schritt für deine Gesundheit und Fitness machst. Lass uns gleich mit dem Papierkram beginnen, damit du starten kannst und deine Fortschritte erreichen kannst! 

---

**Bewertung Bedarfsermittlung: 9**  
**Bewertung Struktur: 9**  
**Bewertung Abschlusswahrscheinlichkeit: 10**  

Die Bedarfsermittlung war sehr detailliert und hat gut das Verständnis für die Situation des Kunden gefördert. Die Struktur des Gesprächs war klar und zielgerichtet, was den Kunden in die richtige Richtung geführt hat. Die Abschlusswahrscheinlichkeit war hoch, da der Kunde deutlich interessiert war und positive Antworten auf die Fragen gegeben hat. Der Fokus auf individuelle Betreuung und Flexibilität hat das Vertrauen des Kunden gestärkt. Gute Arbeit!', '2026-03-26 19:27:12.91689+00'),
	('f6842400-0466-4d43-9ff4-675857c4e998', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'user', 'Ganz einfach, wir machen Tests. Wir gucken, wie gut du mit jeder Übung klarkommst, also sowohl vom Bewegungsradius, von der Belastung her, vom eventuellen Schmerzempfinden her, aber natürlich auch vom Faktor, was dir Spaß macht und was dir nicht Spaß macht. Und so finden wir eben ganz klar raus, welches Trainingsprogramm, welche Übungen für dich, für dein Knie, aber natürlich auch für den Rest deines Körpers, also wenn, dann sollte man ja sowieso alles trainieren, hier das Richtige ist.', '2026-04-07 12:02:09.456953+00'),
	('aa6afa57-3c17-45e3-afff-c2dff54a4a2a', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'assistant', 'Um wirklich überzeugt zu sein, bräuchte ich eine klare Perspektive auf meine Fortschritte und wie die Trainingsgestaltung konkret meinem Knie helfen kann. Auch die regelmäßige persönliche Betreuung und Unterstützung wären für mich sehr wichtig. Wenn ich das Gefühl habe, dass jemand an meiner Seite ist, der auf meinen Fortschritt achtet und mich motiviert, dann wäre ich eher bereit, es wirklich durchzuziehen. Außerdem wäre es hilfreich, von anderen positiven Erfahrungen zu hören – vielleicht gibt es ja Mitglieder, die ähnliche Probleme hatten und inzwischen erfolgreich damit umgehen konnten.', '2026-04-07 12:10:41.832305+00'),
	('67cf4ceb-584d-4ee0-82d5-c8ee27055442', 'c0f16d35-771f-41c2-825f-e8c29305bb9c', 'assistant', 'Trainingslevel:
- Easy
- Realistisch
- Hart

Lead-Quelle:
- Webseite
- Anzeige (Facebook / Instagram)
- Promo-Stand
- Empfehlung', '2026-03-30 14:23:31.13338+00'),
	('90414912-d819-4520-b9ea-69c42f87238b', 'c0f16d35-771f-41c2-825f-e8c29305bb9c', 'user', 'easy / empfehlung', '2026-03-30 14:23:59.347746+00'),
	('07a2b283-a398-407c-a138-a664a8a789b5', 'c0f16d35-771f-41c2-825f-e8c29305bb9c', 'assistant', 'Hallo?', '2026-03-30 14:24:02.759172+00'),
	('e53463c3-96c6-4d72-a665-61dfbe8cd2de', 'c0f16d35-771f-41c2-825f-e8c29305bb9c', 'user', 'Hallo Frau Secele, hier ist Aysun Yüksel vom Habibifit. Ihre Cousine Gökce hat uns gesagt dass sie sie gerne mal zu einem Training begleiten würden um zu schauen ob das etwas ist. Ich rufe an um dafür einen Termin auszumachen Vallah.', '2026-03-30 14:25:28.35687+00'),
	('8ac732f5-1d20-470d-b937-dcd999f6042c', 'c0f16d35-771f-41c2-825f-e8c29305bb9c', 'assistant', 'Hallo? Wer ist da?', '2026-03-30 14:25:31.689713+00'),
	('48d4ca4c-a2f5-4369-8428-9f41ea42b90f', 'c0f16d35-771f-41c2-825f-e8c29305bb9c', 'user', 'Sind sie schwerhörig ? Aysun Yüksel vom Habibifit. Es geht um Ihr Probetraining mit ihrer Cousine.', '2026-03-30 14:26:23.826436+00'),
	('4f57e4d6-7be1-4c27-80e4-cb936d1a2c92', 'c0f16d35-771f-41c2-825f-e8c29305bb9c', 'assistant', 'Oh, ja, sorry, es ist gerade etwas laut hier. Ja, ich habe von Gökce gehört, dass sie mich begleiten wollte. Aber ich bin mir nicht so sicher, ob ich dazu Zeit habe. Ich bin gerade sehr beschäftigt.', '2026-03-30 14:26:26.90315+00'),
	('fe67c23e-7ab2-4ee2-b8e2-162db01fd8f3', 'c0f16d35-771f-41c2-825f-e8c29305bb9c', 'user', 'Ah verstehe. Aber generelles INteresse ist schon vorhanden ode r?', '2026-03-30 14:28:39.817244+00'),
	('685aaca4-77c4-439f-b9b1-e4a7a5300543', 'c0f16d35-771f-41c2-825f-e8c29305bb9c', 'assistant', 'Ja, ich finde die Idee, mal etwas für die Fitness zu tun, schon interessant. Aber wie gesagt, die Zeit ist ein großes Problem für mich. Und ich war auch schon mal in einem Fitnessstudio, das war nicht so toll.', '2026-03-30 14:28:44.056585+00'),
	('2fc6c838-e229-4022-8cee-353da5e7e4fd', 'c0f16d35-771f-41c2-825f-e8c29305bb9c', 'user', 'Oh das tut mir natürlich leid dass die letzte Erfahrung nicht so positiv war. Aber Gökce fühlt sich sehr wohl bei uns und wir würde Sie gerne auch von unserer speziellen Atmosphäre begeistern. Die Beratung und das Probetraining dauern auch nicht lange. Wieviel ZEit hätten sie denn für eine Beratung ?', '2026-03-30 14:30:48.618256+00'),
	('4ddbb6c2-abf0-41fe-9f71-d95cf5458236', 'c0f16d35-771f-41c2-825f-e8c29305bb9c', 'assistant', 'Ich weiß nicht... vielleicht 30 Minuten, aber es müsste wirklich schnell gehen. Ich habe noch einiges zu erledigen. Und ich habe auch ein bisschen Bedenken, dass ich überfordert werde.', '2026-03-30 14:30:52.297729+00'),
	('d760fa5a-40f1-4f90-b869-9c222fc72680', 'c0f16d35-771f-41c2-825f-e8c29305bb9c', 'user', 'DAs kriegen wir locker hin. also 30min. Passt es besser vormittags oder nachmittags ?', '2026-03-30 14:34:56.991897+00'),
	('df9056d4-3016-4a62-987d-08cbd29b8310', 'c0f16d35-771f-41c2-825f-e8c29305bb9c', 'assistant', 'Hmm, vormittags wäre wahrscheinlich besser, aber ich kann nicht genau sagen, wann ich wirklich Zeit habe. Vielleicht nächste Woche? Aber ich kann Ihnen nicht versprechen, dass ich es schaffe.', '2026-03-30 14:35:03.672615+00'),
	('7054e7f9-8abd-4cb4-b583-19555273bf42', 'c0f16d35-771f-41c2-825f-e8c29305bb9c', 'user', 'Ok vormittags nächste woche. Welcher Tag würde am besten passen ?', '2026-03-30 14:35:37.799249+00'),
	('47d5a9b0-4374-470e-81c3-7013d542923b', 'c0f16d35-771f-41c2-825f-e8c29305bb9c', 'assistant', 'Wie wäre es mit Dienstag? Aber ich kann nicht garantieren, dass ich es schaffe. Ich habe gerade wirklich viel um die Ohren.', '2026-03-30 14:35:40.99199+00'),
	('de7a976c-d5ad-49a7-8a25-6a8aaa69204c', 'c0f16d35-771f-41c2-825f-e8c29305bb9c', 'user', 'Liebe Frau Secele, Das ist natürlich kein Problem. Ich schlage vor wir buchen den Termin am Dienstag um 10 Uhr ein und wenn wirklich etwas dazwischen kommen sollte, dann melden Sie sich einfach vorher. Ist das ok ?', '2026-03-30 14:36:52.243993+00'),
	('829326bb-7c74-4ed4-a11f-bdd2f214f94d', 'c0f16d35-771f-41c2-825f-e8c29305bb9c', 'assistant', 'Okay, das klingt nach einem Plan. Also am Dienstag um 10 Uhr. Ich hoffe, ich schaffe es dann. Vielen Dank, Aysun.', '2026-03-30 14:36:54.975382+00'),
	('f34fefe3-9d96-4066-bb85-47ea91698583', 'c0f16d35-771f-41c2-825f-e8c29305bb9c', 'user', 'Danke auch und noch einen schönen Tag.', '2026-03-30 14:37:14.844789+00'),
	('f812c59b-6059-48f5-a448-7baf3a558a53', 'c0f16d35-771f-41c2-825f-e8c29305bb9c', 'assistant', 'Gespraechseroeffnung: 6/10  
Kontext / Permission: 7/10  
Bedarf / Interesse erkannt: 7/10  
Nutzen des Termins erklaert: 6/10  
Einwandbehandlung: 5/10  
Verbindlichkeit im Abschluss: 7/10  
Terminwahrscheinlichkeit: 75 %  
APPOINTMENT_RESULT: appointment  
Begruendung: Ein Termin wurde erfolgreich für Dienstag um 10 Uhr vereinbart, trotz der Unsicherheiten des Leads.

Kurzfazit:  
Das Gespräch zeigte ein gewisses Interesse des Leads, jedoch war die Unsicherheit und Zeitmangel deutlich spürbar. Das Vertrauen zur vorherigen Erfahrung im Fitnessstudio könnte auch als Hürde betrachtet werden.

Was war stark?  
- Trotz der Bedenken konnte ein Termin vereinbart werden.  
- Der Einsatz auf das positive Feedback der Cousine war hilfreich.

Was sollte verbessert werden?  
- Die Einwandbehandlung könnte proaktiver gestaltet werden, um das Vertrauen zu stärken.  
- Anstatt nur die Zeit im Gespräch anzusprechen, wäre eine bessere Antwort bezüglich Überforderung wichtig.

Konkreter Fokus für das nächste Training:  
Fokussiere dich darauf, Einwände gezielt und empathisch anzugehen, um das Vertrauen des Leads zu gewinnen.', '2026-03-30 14:37:21.429563+00'),
	('0bac5639-1eeb-4b77-8c04-9e4630160cba', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'assistant', 'Das klingt gut, ich fühle mich dadurch etwas beruhigter. Es ist wichtig für mich, dass die Übungen gut auf mich abgestimmt sind, ohne dass ich mich überforderte. Ich denke, wenn ich ein Programm hätte, was meine Bedürfnisse berücksichtigt und dabei auch Spaß macht, würde ich eher dranbleiben. Mich macht es auch skeptisch, wie ich sicherstellen kann, dass ich das alles konsequent umsetze, gerade weil ich manchmal auch einen vollen Arbeitsalltag habe. Wie geht ihr damit um?', '2026-04-07 12:02:18.034554+00'),
	('5ae0c8cc-4893-4dbb-9b6b-a3584d9edb8d', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', 'user', 'Ja, guck mal, der Willi da hinten, der hat eine OP am Meniskus gehabt und die Reha ist bei dem total schief gelaufen. Der kam hier auf Krücken rein und nach drei Monaten konnte der mit seinem eigenen Körpergewicht schon wieder selbstständig eine Kniebeuge machen. Ja, weil wir ihn konsequent an die Hand genommen haben, weil wir einen Plan gemacht haben, weil wir genau das Programm für ihn aufgestellt haben, was für ihn funktioniert.', '2026-04-07 12:17:06.147637+00'),
	('215fdb30-755e-485e-bfa4-a4805461ecd4', '014fc72c-62f0-47d7-a327-8d2ff677a227', 'assistant', 'Ja, Kevin hier?', '2026-03-31 18:25:55.017713+00'),
	('5210e3d6-9cb9-4c44-9060-9b39a57634bd', '014fc72c-62f0-47d7-a327-8d2ff677a227', 'user', 'Hi, hier ist Markus vom Bizeps Gym, spreche ich mir Kevin Spacken ?', '2026-03-31 18:27:24.786483+00'),
	('0233424d-31e7-4679-9047-a9b64df31f76', '014fc72c-62f0-47d7-a327-8d2ff677a227', 'assistant', 'Ja, genau, Kevin Spacken am Telefon. Was kann ich für dich tun?', '2026-03-31 18:27:28.23378+00'),
	('db2c41c6-d21e-407a-8471-831b6c5b7964', '014fc72c-62f0-47d7-a327-8d2ff677a227', 'user', 'Cool, dass ich dich erreiche. du hast dich auf unsere anzeige gemeldet. es geht um das 90 Tage Transformationsprogramm. Hast du grad 5min ?', '2026-03-31 18:28:45.260984+00'),
	('a471cefd-32a6-406a-b49c-f33c1ac1fbdd', '014fc72c-62f0-47d7-a327-8d2ff677a227', 'assistant', 'Ja, ich habe gerade ein bisschen Zeit. Was möchtest du mir darüber erzählen?', '2026-03-31 18:28:48.236429+00'),
	('6c62efbc-3c93-44c4-9076-bfb425a0b654', '014fc72c-62f0-47d7-a327-8d2ff677a227', 'user', 'Wir suchen aktuell 30 Leute die Lust haben in 90 tagen muskeln aufzubauen, körperfett zu verlieren und sich insgesamt fitter zu fühlen und du hast dich ja eingetragen.', '2026-03-31 18:29:42.774126+00'),
	('433176b3-0d94-47af-bbe2-464a9787c729', '014fc72c-62f0-47d7-a327-8d2ff677a227', 'assistant', 'Ja, genau, das interessiert mich. Aber ich bin ein bisschen skeptisch, was diese Versprechen angeht. Ich möchte echt sicher gehen, dass es keinen reinen Verkaufsfokus hat. Was kann ich beim Termin erwarten?', '2026-03-31 18:29:46.25584+00'),
	('ac579fa5-edd3-4105-84a2-7b2909302ece', '014fc72c-62f0-47d7-a327-8d2ff677a227', 'user', 'Das kann ich verstehen. Und nein hier gehts nicht um Verkaufsfokus. Im Erstgespräch wollen wir ja erst einmal herausfinden ob Du Lust hast da mitzumachen, wie so deine Vorstellungen sind und dann erklären wir dir ja auch genau worum es geht. Der Termin dauert so 30min. Passt es dir lieber vormittags oder nachmittags ?', '2026-03-31 18:31:46.010974+00'),
	('65f2a453-69b4-4ede-ac03-e43892ddf87d', '014fc72c-62f0-47d7-a327-8d2ff677a227', 'assistant', 'Klingt gut. Vormittags wäre für mich besser. Hast du da bestimmte Zeiten im Kopf?', '2026-03-31 18:31:49.424802+00'),
	('e5e628e3-f7ec-453a-83c8-3e7c2db82a31', '014fc72c-62f0-47d7-a327-8d2ff677a227', 'user', 'Vormittags also. Ich hätte nächsten Dienstag um 10 Uhr oder Mittwoch um 11:30 Uhr noch was frei.', '2026-03-31 18:32:22.786875+00'),
	('409a3de3-fa30-409d-b9ff-d448519fa6da', '014fc72c-62f0-47d7-a327-8d2ff677a227', 'assistant', 'Dienstag um 10 Uhr klingt gut. Aber ich hoffe, dass es nicht zu viel Werbung ist. Ich möchte wirklich einfach wissen, ob das Programm für mich passt.', '2026-03-31 18:32:26.405881+00'),
	('e16409fa-4731-4841-8f98-4806ad1cee3f', '014fc72c-62f0-47d7-a327-8d2ff677a227', 'user', 'Klar, deswegen ja auch der Termin und keine Sorge, im Termin beantworten wir Dir alle Fragen. Dann trage ich den Dienstag um 10 Uhr für Dich als Termin ein ?', '2026-03-31 18:33:12.716702+00'),
	('80e37003-18ff-496c-af2a-4f1c09c8c557', '014fc72c-62f0-47d7-a327-8d2ff677a227', 'assistant', 'Ja, mach das bitte. Dienstag um 10 Uhr passt perfekt für mich.', '2026-03-31 18:33:15.886372+00'),
	('051fe3ad-674d-42fc-a8c2-fc8dbea23a97', '014fc72c-62f0-47d7-a327-8d2ff677a227', 'user', 'Perfekt. Dann sehen wir uns am Dienstag. HAb noch einen schönen Tag.', '2026-03-31 18:33:34.25934+00'),
	('3a4768a2-c769-4515-81af-a4856c20d8f2', '014fc72c-62f0-47d7-a327-8d2ff677a227', 'assistant', 'Danke, dir auch! Bis Dienstag!', '2026-03-31 18:33:37.071627+00'),
	('581cabf2-432c-4dd6-93e0-57efd3e21160', '014fc72c-62f0-47d7-a327-8d2ff677a227', 'user', 'Tschüssn', '2026-03-31 18:34:09.620192+00'),
	('88933fbb-cc34-4a24-8666-f4598f0390c2', '014fc72c-62f0-47d7-a327-8d2ff677a227', 'assistant', '**Bewertung:**

Gesprächseröffnung: 8/10  
Kontext / Permission: 7/10  
Bedarf / Interesse erkannt: 8/10  
Nutzen des Termins erklärt: 8/10  
Einwandbehandlung: 7/10  
Verbindlichkeit im Abschluss: 9/10  
Terminwahrscheinlichkeit: 90 %  
APPOINTMENT_RESULT: appointment  
Begründung: Ein konkreter Termin wurde erfolgreich vereinbart, und der Lead zeigte Interesse und Offenheit für das Gespräch.

Kurzfazit:  
Das Gespräch war freundlich und kooperativ. Es wurden Bedenken geäußert und klärende Informationen bereitgestellt, was zu einem positiven Abschluss führte.

Was war stark?  
- Die Einwandbehandlung war zielgerichtet und empathisch.  
- Der Lead fühlte sich ernst genommen, was zu seiner Offenheit beitrug.

Was sollte verbessert werden?  
- Etwas stärkere Struktur in der Erklärung des Termins wäre hilfreich gewesen.  
- Mehr Informationen zum Ablauf des ersten Gesprächs hätten möglicherweise zusätzliche Sicherheit gegeben.

Konkreter Fokus für das nächste Training:  
Achte darauf, wie du den Ablauf des Beratungsgesprächs klar und verständlich kommunizierst, um Vertrauen zu fördern.', '2026-03-31 18:34:15.846068+00');


--
-- Data for Name: complaint_management_avatar_snapshots; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: complaint_management_kpi_snapshots; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: copecart_ipn_events; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."copecart_ipn_events" ("id", "event_key", "raw_event_id", "event_type", "copecart_order_id", "copecart_product_id", "copecart_customer_email", "amount", "processing_status", "payload", "received_at", "processed_at", "created_at", "updated_at") VALUES
	('218f7068-2d45-429a-be32-adcbdc0b559a', 'TEST-ORDER-123:payment_success:2026-04-25T08:34:14.110Z', NULL, 'payment_success', 'TEST-ORDER-123', 'TEST-PRODUCT-1', 'io@abschluss-io.de', '39.00', 'received', '{"event": "payment_success", "amount": "39.00", "status": "paid", "order_id": "TEST-ORDER-123", "product_id": "TEST-PRODUCT-1", "customer_email": "io@abschluss-io.de"}', '2026-04-25 08:34:15.098039+00', NULL, '2026-04-25 08:34:15.098039+00', '2026-04-25 08:34:15.098039+00'),
	('3dca8588-0770-4246-8a25-fda8fba12c18', 'codex-ipn-event-20260425-1', 'codex-ipn-event-20260425-1', 'payment_success', 'codex-ipn-order-20260425-1', 'codex-test-subscription', 'io@abschluss-io.de', NULL, 'received', '{"event": "payment_success", "status": "paid", "paid_at": "2026-04-25T12:00:00Z", "event_id": "codex-ipn-event-20260425-1", "order_id": "codex-ipn-order-20260425-1", "paid_until": "2026-12-31T23:59:59Z", "product_id": "codex-test-subscription", "customer_email": "io@abschluss-io.de"}', '2026-04-25 08:39:32.932173+00', NULL, '2026-04-25 08:39:32.932173+00', '2026-04-25 08:39:32.932173+00'),
	('64b180d6-d776-43ac-b6e0-b835c803a3ff', 'TEST-ORDER-123:payment_success:2026-04-25T08:50:53.281Z', NULL, 'payment_success', 'TEST-ORDER-123', 'TEST-PRODUCT-1', 'io@abschluss-io.de', '39.00', 'processed', '{"event": "payment_success", "amount": "39.00", "status": "paid", "order_id": "TEST-ORDER-123", "product_id": "TEST-PRODUCT-1", "customer_email": "io@abschluss-io.de"}', '2026-04-25 08:50:53.884308+00', '2026-04-25 08:50:55.972+00', '2026-04-25 08:50:53.884308+00', '2026-04-25 08:50:56.246088+00'),
	('1d46b0e2-ed16-41ec-ad17-ef2ed96d9f18', 'TEST-ORDER-123:payment_failed:2026-04-25T08:54:14.755Z', NULL, 'payment_failed', 'TEST-ORDER-123', NULL, 'io@abschluss-io.de', NULL, 'processed', '{"event": "payment_failed", "status": "failed", "order_id": "TEST-ORDER-123", "customer_email": "io@abschluss-io.de"}', '2026-04-25 08:54:15.544404+00', '2026-04-25 08:54:16.299+00', '2026-04-25 08:54:15.544404+00', '2026-04-25 08:54:16.394248+00');


--
-- Data for Name: copecart_subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."copecart_subscriptions" ("id", "user_id", "organization_id", "copecart_order_id", "copecart_product_id", "copecart_customer_email", "subscription_status", "last_payment_at", "current_period_paid_until", "last_ipn_event_at", "last_event_key", "created_at", "updated_at", "grace_period_until", "payment_failed_at", "payment_failure_email_sent_at") VALUES
	('68a62e9e-e85d-4164-9739-1888cba577c4', '04964933-1009-49dd-ab72-784ce2e36a16', 'f9bea402-2bde-4418-8dfc-ab2d32361161', 'TEST-ORDER-123', 'TEST-PRODUCT-1', 'io@abschluss-io.de', 'active', '2026-04-25 08:50:53.281+00', '2026-06-08 12:11:45.696493+00', '2026-04-25 08:54:14.755+00', 'TEST-ORDER-123:payment_failed:2026-04-25T08:54:14.755Z', '2026-04-25 08:50:55.491222+00', '2026-05-09 12:11:45.696493+00', NULL, NULL, NULL);


--
-- Data for Name: full_sales_avatar_snapshots; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."full_sales_avatar_snapshots" ("id", "session_id", "previous_avatar_snapshot_id", "user_id", "organization_id", "industry_key", "avatar_name", "avatar_gender", "avatar_age", "avatar_life_stage", "avatar_profession_or_context", "avatar_primary_problem", "avatar_secondary_context", "avatar_goal", "avatar_emotional_tone", "opening_message", "created_at", "updated_at", "avatar_job_situation", "avatar_family_situation", "avatar_time_budget", "avatar_financial_budget", "avatar_disc_type", "avatar_difficulty", "avatar_objections") VALUES
	('f42dead6-5ba2-47ed-a3de-e14190dee054', 'bb76b586-a78e-4a97-8595-3d22d08d3e0d', NULL, '6808e05c-1714-425b-a6a1-1d43564917a8', 'eab65369-3ef6-439e-828b-04b3e4acb8d3', 'fitness', 'Markus', 'male', 51, 'selbstständiger Beruf mit hoher körperlicher Belastung', 'selbstständiger Handwerker', 'anhaltende Kniebeschwerden nach langen Arbeitstagen', 'möchte belastbarer werden und Gewicht reduzieren, ohne das Knie zu überlasten', 'wieder stabil arbeiten können, ohne dass das Knie ständig limitiert', 'bodeständig, belastungsorientiert und besorgt um Verschlechterung', 'Hi, ich bin Markus, 51, selbstständiger Handwerker. Mein rechtes Knie macht mir seit Monaten immer mehr Probleme, vor allem nach langen Arbeitstagen. Ich würde gern wieder belastbarer werden und ein bisschen abnehmen, habe aber Sorge, dass Training das Knie eher noch mehr reizt.

Du kannst das Gespräch gerne beginnen.', '2026-04-01 11:47:15.774503+00', '2026-04-01 11:47:15.774503+00', NULL, NULL, NULL, NULL, NULL, NULL, '[]'),
	('564b0456-2557-49a5-8d12-cbab76691820', '3ec701c5-8890-4dfd-97ae-bae4bc054e32', NULL, '04964933-1009-49dd-ab72-784ce2e36a16', 'f9bea402-2bde-4418-8dfc-ab2d32361161', 'fitness', 'Jan', 'male', 71, 'selbstständiger Beruf mit hoher körperlicher Belastung', 'selbstständiger Handwerker', 'anhaltende Kniebeschwerden nach langen Arbeitstagen', 'möchte belastbarer werden und Gewicht reduzieren, ohne das Knie zu überlasten', 'wieder stabil arbeiten können, ohne dass das Knie ständig limitiert', 'bodeständig, belastungsorientiert und besorgt um Verschlechterung', 'Hallo, ich bin Jan. Ich will direkt ehrlich sein: anhaltende Kniebeschwerden nach langen Arbeitstagen nervt mich zwar, aber ich bin gerade kaum ueberzeugt, dass so ein Gespraech fuer mich wirklich etwas veraendert.', '2026-05-09 11:04:59.472825+00', '2026-05-09 11:04:59.472825+00', 'retired', 'married', 'flexible', 'good', 'steady', 'almost_impossible', '["bad_past_experience", "motivation_doubts", "partner_approval", "low_trust"]'),
	('d59d4c2c-9d10-4302-9caf-7d5bf2019329', 'ea695adb-93f9-4a85-80a9-5aef3e96b188', '564b0456-2557-49a5-8d12-cbab76691820', '04964933-1009-49dd-ab72-784ce2e36a16', 'f9bea402-2bde-4418-8dfc-ab2d32361161', 'fitness', 'Sabine', 'female', 46, 'frischer Ruhestand', 'Rentnerin nach medizinischem Eingriff', 'Unsicherheit nach künstlicher Hüfte', 'will nichts falsch machen und sucht kontrollierten Wiedereinstieg', 'nach der künstlichen Hüfte wieder sicher und selbstbewusst in Bewegung kommen', 'vorsichtig, sicherheitsorientiert und diszipliniert', 'Hallo, Sabine hier. Ich schaue zwar nach einer Loesung fuer unsicherheit nach künstlicher hüfte, aber ehrlich gesagt bin ich bei zeit und schlechte vorerfahrung ziemlich skeptisch.', '2026-05-12 08:52:46.772553+00', '2026-05-12 08:52:46.772553+00', 'self_employed', 'single_parent', 'limited', 'high', 'experimental', 'hard', '["time", "bad_past_experience", "fear_of_commitment"]');


--
-- Data for Name: full_sales_kpi_snapshots; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: invitations; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: organization_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."organization_members" ("id", "organization_id", "user_id", "role_in_org", "created_at") VALUES
	('558c4bb2-2a4a-4d5d-b908-3380f4d35f72', 'eab65369-3ef6-439e-828b-04b3e4acb8d3', '6808e05c-1714-425b-a6a1-1d43564917a8', 'admin', '2026-03-22 14:43:59.816338+00'),
	('ffd79f2a-ce6a-4514-b0af-df7b0f6e8a41', '5f919ec1-83fc-4b29-a103-ff680a752d2c', 'af19c735-24f4-456d-b155-9bde3b3eb7b9', 'admin', '2026-03-23 20:37:58.743876+00'),
	('0543a10b-ff4f-41d2-97a5-272067b54581', 'f9bea402-2bde-4418-8dfc-ab2d32361161', '04964933-1009-49dd-ab72-784ce2e36a16', 'admin', '2026-04-22 15:56:45.904714+00');


--
-- Data for Name: session_scores; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."subscriptions" ("id", "organization_id", "stripe_customer_id", "stripe_subscription_id", "plan_key", "status", "current_period_end", "created_at", "updated_at") VALUES
	('050126e8-8c59-4631-b6ae-29f7a0ed8e6a', 'eab65369-3ef6-439e-828b-04b3e4acb8d3', NULL, NULL, 'team_3', 'active', NULL, '2026-03-22 14:43:59.816338+00', '2026-03-22 14:43:59.816338+00'),
	('38f5009c-91ed-4f69-982a-4e6f17139f34', '5f919ec1-83fc-4b29-a103-ff680a752d2c', NULL, NULL, 'solo', 'active', NULL, '2026-03-23 20:37:58.743876+00', '2026-03-23 20:37:58.743876+00'),
	('cb73f2b4-5b0e-4062-835a-214c00f3b141', 'f9bea402-2bde-4418-8dfc-ab2d32361161', NULL, NULL, 'team_5', 'active', NULL, '2026-04-22 15:56:45.904714+00', '2026-04-22 15:56:45.904714+00');


--
-- Data for Name: system_event_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."system_event_log" ("id", "severity", "source", "message", "metadata", "environment", "organization_id", "resolved_at", "alert_sent_at", "created_at") VALUES
	('048b35ee-e79f-4378-9e90-4d802675d4b8', 'error', 'copecart_ipn', 'CopeCart IPN processing failed', '{"error": "there is no unique or exclusion constraint matching the ON CONFLICT specification"}', 'production', NULL, NULL, NULL, '2026-04-25 08:34:17.048337+00'),
	('46691fcb-110c-4c46-b3e7-b1bf0f43db17', 'error', 'copecart_ipn', 'CopeCart IPN processing failed', '{"error": "there is no unique or exclusion constraint matching the ON CONFLICT specification"}', 'production', NULL, NULL, NULL, '2026-04-25 08:39:35.341049+00');


--
-- Data for Name: training_reminder_email_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."training_reminder_email_log" ("id", "user_id", "email", "inactivity_triggered", "open_full_sales_triggered", "related_open_full_sales_count", "last_known_activity_at", "resend_message_id", "delivery_status", "error_message", "reason_snapshot", "sent_at", "created_at", "updated_at") VALUES
	('5d1d843b-88a6-46e2-a28f-ed23c1cf096a', '6808e05c-1714-425b-a6a1-1d43564917a8', 'digital-marketing@talkingheads.academy', false, true, 1, '2026-04-01 11:51:03.527966+00', NULL, 'failed', 'not_configured', '{"profileCreatedAt": "2026-03-22T14:43:59.816338+00:00", "lastUserMessageAt": "2026-04-01T11:51:03.527966+00:00", "openFullSalesCount": 1, "inactivityTriggered": false, "lastKnownActivityAt": "2026-04-01T11:51:03.527966+00:00", "lastSessionActivityAt": "2026-04-01T11:47:15.921407+00:00", "openFullSalesTriggered": true}', NULL, '2026-04-01 15:41:49.018261+00', '2026-04-01 15:41:49.148866+00'),
	('bd33a360-de35-4170-8432-5d5f585a533d', 'af19c735-24f4-456d-b155-9bde3b3eb7b9', 'iphone@fitskins.de', true, false, 0, '2026-03-23 20:37:58.743876+00', NULL, 'failed', 'not_configured', '{"profileCreatedAt": "2026-03-23T20:37:58.743876+00:00", "lastUserMessageAt": null, "openFullSalesCount": 0, "inactivityTriggered": true, "lastKnownActivityAt": "2026-03-23T20:37:58.743876+00:00", "lastSessionActivityAt": null, "openFullSalesTriggered": false}', NULL, '2026-04-01 15:41:49.603821+00', '2026-04-01 15:41:49.953591+00'),
	('6757d7aa-1633-4de2-97d9-d690b1ffc52d', '6808e05c-1714-425b-a6a1-1d43564917a8', 'digital-marketing@talkingheads.academy', false, true, 1, '2026-04-01 11:51:03.527966+00', '7b96a519-5aa1-4937-b15c-a8b39f58e9a4', 'sent', NULL, '{"profileCreatedAt": "2026-03-22T14:43:59.816338+00:00", "lastUserMessageAt": "2026-04-01T11:51:03.527966+00:00", "openFullSalesCount": 1, "inactivityTriggered": false, "lastKnownActivityAt": "2026-04-01T11:51:03.527966+00:00", "lastSessionActivityAt": "2026-04-01T11:47:15.921407+00:00", "openFullSalesTriggered": true}', '2026-04-01 15:44:39.639+00', '2026-04-01 15:45:21.913992+00', '2026-04-01 15:45:22.399287+00'),
	('6a56c25d-c6d1-4e02-b3e4-99e701cca106', 'af19c735-24f4-456d-b155-9bde3b3eb7b9', 'iphone@fitskins.de', true, false, 0, '2026-03-23 20:37:58.743876+00', '4285bbd0-d470-4305-b1bc-8df4da089c64', 'sent', NULL, '{"profileCreatedAt": "2026-03-23T20:37:58.743876+00:00", "lastUserMessageAt": null, "openFullSalesCount": 0, "inactivityTriggered": true, "lastKnownActivityAt": "2026-03-23T20:37:58.743876+00:00", "lastSessionActivityAt": null, "openFullSalesTriggered": false}', '2026-04-01 15:44:40.08+00', '2026-04-01 15:45:22.499862+00', '2026-04-01 15:45:22.814547+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 173, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict E1t9YzeTsdEdAshQXttfbb2nSO2Sne1Oc6gpaYxbtvSM5cqYcNVQFLGicX6wDhs

RESET ALL;
