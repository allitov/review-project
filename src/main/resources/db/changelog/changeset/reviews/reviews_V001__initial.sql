CREATE TABLE IF NOT EXISTS reviews
(
    id             BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY UNIQUE,
    article_id     BIGINT NOT NULL,
    reviewer_id    BIGINT NOT NULL,
    rating         INT    NOT NULL,
    comment        TEXT,
    recommendation TEXT   NOT NULL,

    CONSTRAINT fk_review_user FOREIGN KEY (reviewer_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_review_article FOREIGN KEY (article_id) REFERENCES articles (id) ON DELETE CASCADE
)