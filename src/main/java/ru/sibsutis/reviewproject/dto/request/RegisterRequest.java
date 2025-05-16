package ru.sibsutis.reviewproject.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.sibsutis.reviewproject.entity.Role;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String fullName;
    private String email;
    private String password;
    private String specialization;
    private String location;
    private String bio;
    private String institution;
    private String fieldOfExp;
    private List<Role> roles;
}