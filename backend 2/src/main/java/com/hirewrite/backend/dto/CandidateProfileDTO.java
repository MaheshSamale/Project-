package com.hirewrite.backend.dto;




import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data


public class CandidateProfileDTO {
    private Long candidateId;
    private String email;
    private String skills;
    private String phone;
    private String education;
    private String experience;
    private MultipartFile resume;


}
