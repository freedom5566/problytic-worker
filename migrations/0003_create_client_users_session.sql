-- Migration number: 0003 	 2025-08-23T09:07:23.866Z
CREATE TABLE client_users_session (
    sid VARCHAR(128) PRIMARY KEY, -- session id
    user_id BIGINT NOT NULL,
    data JSON,
    expires_at DATETIME NULL,
    create_time DATETIME DEFAULT  CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES client_users(id) ON DELETE CASCADE
);
