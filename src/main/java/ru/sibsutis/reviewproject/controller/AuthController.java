package ru.sibsutis.reviewproject.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.sibsutis.reviewproject.dto.request.AuthRequest;
import ru.sibsutis.reviewproject.dto.request.RegisterRequest;
import ru.sibsutis.reviewproject.dto.response.AuthResponse;
import ru.sibsutis.reviewproject.service.AuthenticationService;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthRequest request) {
        AuthResponse response = authenticationService.authenticate(request);
        log.info("Response: {}", response);

        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
}