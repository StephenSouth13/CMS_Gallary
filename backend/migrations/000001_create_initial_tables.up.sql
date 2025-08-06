-- Dán đoạn này vào file .up.sql của bạn để thay thế nội dung cũ

CREATE TABLE "roles"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) UNIQUE NOT NULL, -- Đã sửa lại vị trí UNIQUE NOT NULL
    "description" TEXT
);

INSERT INTO "roles" (id, name, description) VALUES
(1, 'admin', 'Administrator with full access'),
(2, 'editor', 'Can edit content but not manage users'),
(3, 'user', 'Can view content but not edit'); -- Sửa 'users' thành 'user' để nhất quán

CREATE TABLE "users"( -- Sửa thành "users"
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(), -- Sửa thành uuid
    "email" VARCHAR(100) UNIQUE NOT NULL,
    "hashed_password" VARCHAR(255) NOT NULL, -- Sửa thành hashed_password
    "full_name" VARCHAR(255),
    "avatar_url" VARCHAR(255), -- Sửa thành avatar_url
    "role_id" INT NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT (now()), -- Sửa thành created_at và dùng TIMESTAMPTZ
    FOREIGN KEY ("role_id") REFERENCES "roles" ("id")
);