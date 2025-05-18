package ru.sibsutis.reviewproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sibsutis.reviewproject.entity.Article;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    List<Article> findByAuthorId(Long authorId);
}
