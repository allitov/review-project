CREATE TABLE IF NOT EXISTS articles
(
    id        BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY UNIQUE,
    author_id BIGINT      NOT NULL,
    title     VARCHAR(50) NOT NULL,
    content   TEXT        NOT NULL,
    CONSTRAINT fk_article_user FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE
)