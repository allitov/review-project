package ru.sibsutis.reviewproject.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ru.sibsutis.reviewproject.dto.request.ReviewRequest;
import ru.sibsutis.reviewproject.dto.response.ReviewListResponse;
import ru.sibsutis.reviewproject.service.ReviewService;

@RestController
@RequestMapping("/api/v1/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ReviewListResponse getAllReviewsByReviewerId(@PathVariable("id") Long id) {
        return reviewService.getAllReviewsByReviewerId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createReview(@RequestBody ReviewRequest request) {
        reviewService.createReview(request);
    }
}
