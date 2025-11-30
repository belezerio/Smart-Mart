package com.smartmart.demo.Service;



import com.smartmart.demo.Model.User;
import com.smartmart.demo.Repository.UserRepository;
import com.smartmart.demo.security.JwtTokenProvider;
import com.smartmart.demo.dto.AuthResponse;
import com.smartmart.demo.dto.LoginRequest;
import com.smartmart.demo.dto.SignupRequest;
import com.smartmart.demo.dto.UserDto;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public AuthResponse signup(SignupRequest request) throws ExecutionException, InterruptedException {
        // Validate passwords match
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return new AuthResponse(false, "Passwords do not match", null, null);
        }

        // Check if user already exists
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            return new AuthResponse(false, "User already exists with this email", null, null);
        }

        // Create new user
        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setCreatedAt(System.currentTimeMillis());
        user.setActive(true);

        userRepository.save(user);

        // Generate token
        String token = jwtTokenProvider.generateToken(user.getId(), user.getEmail(), user.getRole());

        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setFullName(user.getFullName());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole());

        return new AuthResponse(true, "User registered successfully", token, userDto);
    }

    public AuthResponse login(LoginRequest request) throws ExecutionException, InterruptedException {
        Optional<User> user = userRepository.findByEmail(request.getEmail());

        if (user.isEmpty()) {
            return new AuthResponse(false, "User not found", null, null);
        }

        User foundUser = user.get();
        if (!passwordEncoder.matches(request.getPassword(), foundUser.getPassword())) {
            return new AuthResponse(false, "Invalid password", null, null);
        }

        if (!foundUser.isActive()) {
            return new AuthResponse(false, "User account is inactive", null, null);
        }

        // Generate token
        String token = jwtTokenProvider.generateToken(foundUser.getId(), foundUser.getEmail(), foundUser.getRole());

        UserDto userDto = new UserDto();
        userDto.setId(foundUser.getId());
        userDto.setFullName(foundUser.getFullName());
        userDto.setEmail(foundUser.getEmail());
        userDto.setRole(foundUser.getRole());

        return new AuthResponse(true, "Login successful", token, userDto);
    }
}
