package com.smartmart.demo.dto;

import lombok.Data;

@Data
public class UserDto {
    private String id;
    private String fullName;
    private String email;
    private String role;
}