package com.smartmart.demo.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private String id;
    private String fullName;
    private String email;
    private String password;
    private String role; // "seller" or "buyer"
    private long createdAt;
    private boolean active;
}