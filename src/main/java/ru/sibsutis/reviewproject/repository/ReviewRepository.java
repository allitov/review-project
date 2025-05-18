package ru.sibsutis.reviewproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sibsutis.reviewproject.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
