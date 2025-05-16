package ru.sibsutis.reviewproject.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {

    private String fullName;
    private String email;
    private String specialization;
    private String location;
    private String bio;
    private String institution;
    private String fieldOfExp;
}
