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
import ru.sibsutis.reviewproject.entity.User;
import ru.sibsutis.reviewproject.mapper.AuthMapper;
import ru.sibsutis.reviewproject.repository.UserRepository;
import ru.sibsutis.reviewproject.security.JwtService;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final AuthMapper authMapper;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Пользователь с таким email уже существует");
        }

        User user = authMapper.toUserEntity(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        String jwtToken = jwtService.generateToken(user);

        return authMapper.toAuthResponse(user, jwtToken);
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

            return authMapper.toAuthResponse(user, jwtToken);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Неверный email или пароль");
        }
    }
}