package ru.sibsutis.reviewproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sibsutis.reviewproject.entity.Article;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    List<Article> findByAuthorId(Long authorId);

    List<Article> findByReviewedFalse();
}
