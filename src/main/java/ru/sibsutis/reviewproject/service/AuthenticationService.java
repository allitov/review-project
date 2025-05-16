package ru.sibsutis.reviewproject.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.sibsutis.reviewproject.dto.request.AuthRequest;
import ru.sibsutis.reviewproject.dto.request.RegisterRequest;
import ru.sibsutis.reviewproject.dto.response.AuthResponse;
import ru.sibsutis.reviewproject.entity.Role;
import ru.sibsutis.reviewproject.entity.User;
import ru.sibsutis.reviewproject.repository.UserRepository;
import ru.sibsutis.reviewproject.security.JwtService;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Пользователь с таким email уже существует");
        }

        List<Role> roles = request.getRoles();
        if (roles == null || roles.isEmpty()) {
            roles = new ArrayList<>();
            roles.add(Role.ROLE_USER);
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setSpecialization(request.getSpecialization());
        user.setLocation(request.getLocation());
        user.setBio(request.getBio());
        user.setInstitution(request.getInstitution());
        user.setFieldOfExp(request.getFieldOfExp());
        user.setRoles(roles);

        userRepository.save(user);

        String jwtToken = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(jwtToken)
                .userId(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .build();
    }

    public AuthResponse authenticate(AuthRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            User user = (User) authentication.getPrincipal();

            String jwtToken = jwtService.generateToken(user);

            return AuthResponse.builder()
                    .token(jwtToken)
                    .userId(user.getId())
                    .email(user.getEmail())
                    .fullName(user.getFullName())
                    .build();
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Неверный email или пароль");
        }
    }
}