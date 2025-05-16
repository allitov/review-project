package ru.sibsutis.reviewproject.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.sibsutis.reviewproject.dto.request.UserRequest;
import ru.sibsutis.reviewproject.dto.response.UserResponse;
import ru.sibsutis.reviewproject.entity.User;
import ru.sibsutis.reviewproject.mapper.UserMapper;
import ru.sibsutis.reviewproject.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserResponse findById(Long id) {
        User foundUser = userRepository.findById(id).orElseThrow();

        return userMapper.toUserResponse(foundUser);
    }

    public UserResponse updateById(Long id, UserRequest request) {
        User foundUser = userRepository.findById(id).orElseThrow();

        userMapper.updateUserEntity(foundUser, request);

        userRepository.save(foundUser);

        return userMapper.toUserResponse(foundUser);
    }
}
