package ru.sibsutis.reviewproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sibsutis.reviewproject.entity.Review;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByReviewerId(Long reviewerId);

    Optional<Review> findByArticleId(Long articleId);
}
