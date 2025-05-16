CREATE TABLE IF NOT EXISTS users
(
    id             BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY UNIQUE,
    full_name      VARCHAR(50)  NOT NULL,
    email          VARCHAR(50)  UNIQUE NOT NULL,
    password       VARCHAR(255) NOT NULL,
    specialization VARCHAR(50),
    location       VARCHAR(50),
    bio            TEXT,
    institution    VARCHAR(50),
    field_of_exp   VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS user_roles
(
    user_id BIGINT      NOT NULL,
    roles   VARCHAR(20) NOT NULL,
    CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, roles)
);