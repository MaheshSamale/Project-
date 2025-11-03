package com.hirewrite.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CandidateRegisterRequest {
    private String email;
    private String password;
    private String fullName;
}

