package ru.sibsutis.reviewproject.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import ru.sibsutis.reviewproject.dto.request.ReviewRequest;
import ru.sibsutis.reviewproject.dto.response.ReviewListResponse;
import ru.sibsutis.reviewproject.dto.response.ReviewResponse;
import ru.sibsutis.reviewproject.entity.Review;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewMapper {

    @Mapping(target = "id", ignore = true)
    Review toReviewEntity(ReviewRequest request);

    @Mapping(target = "articleId", source = "article.id")
    @Mapping(target = "reviewerId", source = "reviewer.id")
    @Mapping(target = "articleTitle", source = "article.title")
    @Mapping(target = "authorName", source = "article.author.fullName")
    ReviewResponse toReviewResponse(Review review);

    default ReviewListResponse toReviewListResponse(Iterable<Review> reviews) {
        ReviewListResponse response = new ReviewListResponse();
        reviews.forEach(article -> response.getReviews().add(toReviewResponse(article)));

        return response;
    }
}
