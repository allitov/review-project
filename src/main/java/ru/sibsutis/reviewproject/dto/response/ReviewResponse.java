package ru.sibsutis.reviewproject.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponse {

    private Long id;
    private Long articleId;
    private Long reviewerId;
    private Integer rating;
    private String comment;
    private String recommendation;
}
