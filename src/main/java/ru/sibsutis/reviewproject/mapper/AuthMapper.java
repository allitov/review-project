package ru.sibsutis.reviewproject.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import ru.sibsutis.reviewproject.dto.request.RegisterRequest;
import ru.sibsutis.reviewproject.dto.response.AuthResponse;
import ru.sibsutis.reviewproject.entity.Role;
import ru.sibsutis.reviewproject.entity.User;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AuthMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "roles", expression = "java(getRolesWithDefault(request.getRoles()))")
    User toUserEntity(RegisterRequest request);
    
    @Mapping(target = "token", source = "jwtToken")
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "email", source = "user.email")
    @Mapping(target = "fullName", source = "user.fullName")
    AuthResponse toAuthResponse(User user, String jwtToken);

    default List<Role> getRolesWithDefault(List<Role> roles) {
        if (roles == null || roles.isEmpty()) {
            List<Role> defaultRoles = new ArrayList<>();
            defaultRoles.add(Role.ROLE_USER);
            return defaultRoles;
        }
        return roles;
    }
}