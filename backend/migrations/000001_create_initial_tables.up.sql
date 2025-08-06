CREATE TABLE "role"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL UNIQUE,
    "description" TEXT
);
INSERT INTO "role" (id,name,description) VALUES
(1, 'admin', 'Administrator with full access'),
(2, 'editor', 'Can edit content but not manage users'),
(3, 'users', 'Can view content but not edit');

CREATE TABLE "user"(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(50) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(100) NOT NULL UNIQUE,
    "role_id" INTEGER REFERENCES "role"(id) ON DELETE SET NULL
);