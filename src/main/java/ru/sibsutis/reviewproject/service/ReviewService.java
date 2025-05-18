package ru.sibsutis.reviewproject.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.sibsutis.reviewproject.dto.request.ReviewRequest;
import ru.sibsutis.reviewproject.dto.response.ReviewListResponse;
import ru.sibsutis.reviewproject.dto.response.ReviewResponse;
import ru.sibsutis.reviewproject.entity.Review;
import ru.sibsutis.reviewproject.mapper.ReviewMapper;
import ru.sibsutis.reviewproject.repository.ArticleRepository;
import ru.sibsutis.reviewproject.repository.ReviewRepository;
import ru.sibsutis.reviewproject.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    public ReviewResponse getReviewByArticleId(Long articleId) {
        Review review = reviewRepository.findByArticleId(articleId).orElseThrow();

        return reviewMapper.toReviewResponse(review);
    }

    public ReviewListResponse getAllReviewsByReviewerId(Long id) {
        return reviewMapper.toReviewListResponse(reviewRepository.findByReviewerId(id));
    }

    public void createReview(ReviewRequest request) {
        Review review = reviewMapper.toReviewEntity(request);
        review.setArticle(articleRepository.findById(request.getArticleId()).orElseThrow());
        review.setReviewer(userRepository.findById(request.getReviewerId()).orElseThrow());
        review.getArticle().setReviewed(true);

        reviewRepository.save(review);
    }
}
