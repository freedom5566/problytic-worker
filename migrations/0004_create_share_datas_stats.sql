-- Migration number: 0004 	 2025-09-23T14:40:41.283Z
CREATE TABLE share_datas_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id BIGINT NOT NULL,
    monsters_id VARCHAR(128) NOT NULL,
    monsters_name VARCHAR(512) NOT NULL,
    monsters_drop_id VARCHAR(128) NOT NULL,
    monsters_drop_name VARCHAR(512) NOT NULL,
    ref_number BIGINT NOT NULL,
    create_time DATETIME DEFAULT  CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES client_users(id) ON DELETE CASCADE
);
