-- Migration number: 0001 	 2025-08-19T13:46:46.545Z
CREATE TABLE admin_user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(128) NOT NULL DEFAULT '',
    last_name VARCHAR(128) NOT NULL DEFAULT '',
    method_id INTEGER NOT NULL DEFAULT 0,
    username VARCHAR(16) NOT NULL DEFAULT '',
    password VARCHAR(128) NOT NULL DEFAULT '',
    role_id INTEGER NOT NULL DEFAULT 0,
    email_address VARCHAR(128) NOT NULL DEFAULT '',
    description VARCHAR(512) NOT NULL DEFAULT '',
    enable TEXT NOT NULL DEFAULT 'Y'
        CHECK(enable IN ('Y', 'N')),
    create_time DATETIME DEFAULT  CURRENT_TIMESTAMP,
    update_time DATETIME NULL,
    delete_time DATETIME NULL
);
