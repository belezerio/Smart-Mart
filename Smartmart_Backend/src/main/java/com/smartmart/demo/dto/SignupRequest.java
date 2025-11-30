package com.smartmart.demo.dto;

import lombok.Data;

@Data
public class SignupRequest {
    private String fullName;
    private String email;
    private String password;
    private String confirmPassword;
    private String role; // "seller" or "buyer"
}