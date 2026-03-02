--- 1. MEMBERSIHKAN DATABASE (Hapus yang lama agar tidak konflik) ---
DROP TABLE IF EXISTS "public"."team_members" CASCADE;
DROP TABLE IF EXISTS "public"."teams" CASCADE;
DROP TABLE IF EXISTS "public"."personal_access_tokens" CASCADE;
DROP TABLE IF EXISTS "public"."users" CASCADE;
DROP TABLE IF EXISTS "public"."migrations" CASCADE;
DROP TABLE IF EXISTS "public"."jobs" CASCADE;
DROP TABLE IF EXISTS "public"."job_batches" CASCADE;
DROP TABLE IF EXISTS "public"."failed_jobs" CASCADE;
DROP TABLE IF EXISTS "public"."configs" CASCADE;
DROP TABLE IF EXISTS "public"."cache_locks" CASCADE;
DROP TABLE IF EXISTS "public"."cache" CASCADE;

DROP SEQUENCE IF EXISTS "public"."configs_id_seq";
DROP SEQUENCE IF EXISTS "public"."failed_jobs_id_seq";
DROP SEQUENCE IF EXISTS "public"."jobs_id_seq";
DROP SEQUENCE IF EXISTS "public"."migrations_id_seq";
DROP SEQUENCE IF EXISTS "public"."personal_access_tokens_id_seq";
DROP SEQUENCE IF EXISTS "public"."team_members_id_seq";
DROP SEQUENCE IF EXISTS "public"."teams_id_seq";
DROP SEQUENCE IF EXISTS "public"."users_id_seq";

--- 2. PEMBUATAN STRUKTUR TABEL ---

-- Tabel Cache & Jobs (Standar Laravel)
CREATE TABLE "public"."cache" ("key" varchar(255) NOT NULL, "value" text NOT NULL, "expiration" int4 NOT NULL, PRIMARY KEY ("key"));
CREATE INDEX cache_expiration_index ON public.cache (expiration);

CREATE TABLE "public"."cache_locks" ("key" varchar(255) NOT NULL, "owner" varchar(255) NOT NULL, "expiration" int4 NOT NULL, PRIMARY KEY ("key"));

CREATE SEQUENCE configs_id_seq;
CREATE TABLE "public"."configs" (
    "id" int8 NOT NULL DEFAULT nextval('configs_id_seq'::regclass),
    "competition_name" varchar(100) NOT NULL,
    "year" int4 NOT NULL,
    "label_link" varchar(75) NOT NULL,
    "link" text NOT NULL,
    "created_at" timestamp(0),
    "updated_at" timestamp(0),
    PRIMARY KEY ("id")
);

CREATE SEQUENCE failed_jobs_id_seq;
CREATE TABLE "public"."failed_jobs" (
    "id" int8 NOT NULL DEFAULT nextval('failed_jobs_id_seq'::regclass),
    "uuid" varchar(255) NOT NULL,
    "connection" text NOT NULL,
    "queue" text NOT NULL,
    "payload" text NOT NULL,
    "exception" text NOT NULL,
    "failed_at" timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."job_batches" (
    "id" varchar(255) NOT NULL,
    "name" varchar(255) NOT NULL,
    "total_jobs" int4 NOT NULL,
    "pending_jobs" int4 NOT NULL,
    "failed_jobs" int4 NOT NULL,
    "failed_job_ids" text NOT NULL,
    "options" text,
    "cancelled_at" int4,
    "created_at" int4 NOT NULL,
    "finished_at" int4,
    PRIMARY KEY ("id")
);

CREATE SEQUENCE jobs_id_seq;
CREATE TABLE "public"."jobs" (
    "id" int8 NOT NULL DEFAULT nextval('jobs_id_seq'::regclass),
    "queue" varchar(255) NOT NULL,
    "payload" text NOT NULL,
    "attempts" int2 NOT NULL,
    "reserved_at" int4,
    "available_at" int4 NOT NULL,
    "created_at" int4 NOT NULL,
    PRIMARY KEY ("id")
);

CREATE SEQUENCE migrations_id_seq;
CREATE TABLE "public"."migrations" (
    "id" int4 NOT NULL DEFAULT nextval('migrations_id_seq'::regclass),
    "migration" varchar(255) NOT NULL,
    "batch" int4 NOT NULL,
    PRIMARY KEY ("id")
);

CREATE SEQUENCE users_id_seq;
CREATE TABLE "public"."users" (
    "id" int8 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "username" varchar(100) NOT NULL,
    "password" varchar(255) NOT NULL,
    "created_at" timestamp(0),
    "updated_at" timestamp(0),
    PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX users_username_unique ON public.users (username);

CREATE SEQUENCE personal_access_tokens_id_seq;
CREATE TABLE "public"."personal_access_tokens" (
    "id" int8 NOT NULL DEFAULT nextval('personal_access_tokens_id_seq'::regclass),
    "tokenable_type" varchar(255) NOT NULL,
    "tokenable_id" int8 NOT NULL,
    "name" text NOT NULL,
    "token" varchar(64) NOT NULL,
    "abilities" text,
    "last_used_at" timestamp(0),
    "expires_at" timestamp(0),
    "created_at" timestamp(0),
    "updated_at" timestamp(0),
    PRIMARY KEY ("id")
);

-- Tabel Inti (Urutan: Teams dulu baru Team_Members)
CREATE SEQUENCE teams_id_seq;
CREATE TABLE "public"."teams" (
    "id" int8 NOT NULL DEFAULT nextval('teams_id_seq'::regclass),
    "name" varchar(50) NOT NULL,
    "created_at" timestamp(0),
    "updated_at" timestamp(0),
    PRIMARY KEY ("id")
);

CREATE SEQUENCE team_members_id_seq;
CREATE TABLE "public"."team_members" (
    "id" int8 NOT NULL DEFAULT nextval('team_members_id_seq'::regclass),
    "team_id" int8 NOT NULL,
    "name" varchar(100) NOT NULL,
    "role" varchar(100) NOT NULL,
    "image" text NOT NULL,
    "created_at" timestamp(0),
    "updated_at" timestamp(0),
    CONSTRAINT "team_members_team_id_foreign" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

--- 3. PENGISIAN DATA (INSERT) ---

-- INDUK DULU (Teams)
INSERT INTO "public"."teams" ("id", "name", "created_at", "updated_at") VALUES
(6, 'TIK SKARIGA Jaya', '2026-02-13 07:02:49', '2026-02-13 08:14:35'),
(2, 'Inspire Code', '2026-02-13 04:15:00', '2026-02-13 08:16:48'),
(8, 'Asynchronous Fighters', '2026-02-13 07:03:21', '2026-02-15 07:33:59'),
(3, 'The Overflowers', '2026-02-13 04:17:42', '2026-02-15 07:34:23'),
(7, 'SKARIGA CTRL + V', '2026-02-13 07:03:05', '2026-02-15 07:34:54'),
(11, 'Zenless Zone Zero', '2026-02-21 13:36:25', '2026-02-22 00:56:47'),
(23, 'The Kessoku Coder', '2026-02-22 02:09:47', '2026-02-22 02:14:09');

-- BARU ANAK (Team Members)
INSERT INTO "public"."team_members" ("id", "team_id", "name", "role", "image", "created_at", "updated_at") VALUES
(7, 7, 'M. Bahruddin Nauvaldy Maulana', 'Developer Operations', '1770981492_698f08748c79d.jpeg', '2026-02-13 11:18:12', '2026-02-13 11:18:12'),
(8, 7, 'Gamaliel Andika Aprilian', 'System Administrator', '1770981527_698f0897340b2.jpg', '2026-02-13 11:18:47', '2026-02-13 11:18:47'),
(9, 7, 'Zulfan Maulana Ahmad', 'Digital Marketing', '1770981587_698f08d32c0eb.jpg', '2026-02-13 11:19:47', '2026-02-13 11:19:47'),
(10, 7, 'Marvello Faisal', 'Copywriter', '1770981615_698f08ef014e6.jpg', '2026-02-13 11:20:15', '2026-02-13 11:20:15'),
(11, 7, 'Agniya Rahmah Qurril A''in', 'UI/UX Designer', '1770981674_698f092a1d757.jpg', '2026-02-13 11:21:14', '2026-02-13 11:21:14'),
(12, 2, 'John Doe', 'AI/ML Engineer', '1770982441_698f0c29b39da.jpg', '2026-02-13 11:34:01', '2026-02-13 11:34:01'),
(13, 2, 'Sarah Browning', 'Cyber Security Expert', '1770982495_698f0c5f33d53.jpg', '2026-02-13 11:34:55', '2026-02-13 11:34:55'),
(14, 2, 'Tom Clappins', 'Senior Website Developer', '1770982531_698f0c83d6301.jpg', '2026-02-13 11:35:31', '2026-02-13 11:35:31'),
(15, 8, 'Shyanne Kassey Doanne', 'IT Support', '1770982597_698f0cc5c1858.jpg', '2026-02-13 11:36:37', '2026-02-13 11:36:37'),
(16, 8, 'Tim Saint-Peterson', 'Data Analyst', '1770982645_698f0cf57f649.jpg', '2026-02-13 11:37:25', '2026-02-13 11:37:25'),
(17, 8, 'Coleman Ross Atkins', 'Mobile Developer', '1770982768_698f0d706501b.jpg', '2026-02-13 11:39:28', '2026-02-13 11:39:28'),
(18, 8, 'Drough Toughman Robertson', 'Python Data Scientist', '1770982832_698f0db0466ed.jpeg', '2026-02-13 11:40:32', '2026-02-13 11:40:32'),
(19, 2, 'Jeff Bezzeroy', 'IT Infrastructure Manager', '1771046730_6990074a44b2c.png', '2026-02-14 05:25:30', '2026-02-14 05:25:30'),
(20, 3, 'Tavel Davis DaShawn', 'Chief Technology Officer', '1771046873_699007d948ba9.jpg', '2026-02-14 05:27:53', '2026-02-14 05:27:53'),
(21, 3, 'Ayesha Sales', 'Technical Writer', '1771046917_6990080552c27.jpg', '2026-02-14 05:28:37', '2026-02-14 05:28:37'),
(22, 3, 'Mia Leslie McCreary', 'Fullstack Developer', '1771046972_6990083c41a92.jpg', '2026-02-14 05:29:32', '2026-02-14 05:29:32'),
(23, 6, 'Terry A. Davis', 'IT Chief', '1771071365_6990678597ffa.jpeg', '2026-02-14 12:16:05', '2026-02-14 12:16:05'),
(25, 6, 'Linus Torvalds', 'Principal Fellow', '1771680453_6999b2c5c4184.png', '2026-02-21 13:27:34', '2026-02-21 13:27:34'),
(32, 11, 'Ellen Joe', 'Mobile Developer', '1771714999_699a39b726b10.jpg', '2026-02-21 23:03:19', '2026-02-21 23:03:19'),
(34, 11, 'Jane Doe', 'Backend Developer', '1771725597_699a631dbeb98.png', '2026-02-22 01:59:57', '2026-02-22 01:59:57'),
(35, 23, 'Hitori Gotoh', 'Frontend Developer', '1771726240_699a65a0ae983.jpg', '2026-02-22 02:10:40', '2026-02-22 02:10:40'),
(36, 23, 'Nijika Ijichi', 'Project Manager', '1771726301_699a65ddde649.jpg', '2026-02-22 02:11:41', '2026-02-22 02:11:41'),
(37, 23, 'Ikuyo Kita', 'UI/UX Designer', '1771726327_699a65f7c00a1.jpg', '2026-02-22 02:12:07', '2026-02-22 02:12:07'),
(38, 23, 'Ryo Yamada', 'Backend Developer', '1771726346_699a660a8189f.jpg', '2026-02-22 02:12:26', '2026-02-22 02:12:26'),
(39, 11, 'Belle', 'Frontend Developer', '1771726373_699a662597490.jpg', '2026-02-22 02:12:53', '2026-02-22 02:12:53');

-- Data Lainnya (Admin, Configs, Migrations)
INSERT INTO "public"."users" ("id", "username", "password", "created_at", "updated_at") VALUES (1, 'admin', '$2y$12$lbv9oTiIKZpzF5ykHMNYueTTPpc5hKd6YKsdv4FUid45GRaiMK8gi', '2026-02-13 04:01:17', '2026-02-13 04:01:17');
INSERT INTO "public"."configs" ("id", "competition_name", "year", "label_link", "link", "created_at", "updated_at") VALUES (1, 'LINQ Singapore Hackathon', 2027, 'Visit our Instagram', 'https://instagram.com/skariga_official', '2026-02-13 13:51:20', '2026-02-22 01:14:14');
INSERT INTO "public"."migrations" ("id", "migration", "batch") VALUES (1, '0001_01_01_000001_create_cache_table', 1), (2, '0001_01_01_000002_create_jobs_table', 1), (3, '2026_02_11_063803_create_users_table', 1), (4, '2026_02_11_064836_create_configs_table', 1), (5, '2026_02_11_065030_create_teams_table', 1), (6, '2026_02_11_065102_create_team_members_table', 1), (7, '2026_02_11_070520_create_personal_access_tokens_table', 1);
INSERT INTO "public"."personal_access_tokens" ("id", "tokenable_type", "tokenable_id", "name", "token", "abilities", "last_used_at", "expires_at", "created_at", "updated_at") VALUES (26, 'App\Models\Auth\User', 1, 'admin-token', '3f83d287b31da6acaa587999fa307c950767006dfbb34adbda1dfcf9c032a378', '["*"]', '2026-02-22 02:14:09', NULL, '2026-02-22 01:04:10', '2026-02-22 02:14:09');

--- FIX SEQUENCE (Penting agar Laravel tidak error saat tambah data baru lewat UI) ---
SELECT setval('teams_id_seq', (SELECT MAX(id) FROM teams));
SELECT setval('team_members_id_seq', (SELECT MAX(id) FROM team_members));
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));