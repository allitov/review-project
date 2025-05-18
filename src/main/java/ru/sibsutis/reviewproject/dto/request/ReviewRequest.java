package ru.sibsutis.reviewproject.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequest {

    private Long articleId;
    private Long reviewerId;
    private Integer rating;
    private String comment;
    private String recommendation;
}
