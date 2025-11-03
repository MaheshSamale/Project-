package com.hirewrite.backend.controller;


import com.hirewrite.backend.entity.CandidateProfile;
import com.hirewrite.backend.repository.CandidateProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.hirewrite.backend.service.CandidateProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/candidate/profile")
@CrossOrigin(origins = "*")
public class CandidateProfileController {

    @Autowired
    private CandidateProfileService profileService;

    @PostMapping("/create")
    public ResponseEntity<?> createOrUpdateProfile(
            @RequestParam Long candidateId,
            @RequestParam String firstName,
            @RequestParam String lastName,
            @RequestParam String phone,
            @RequestParam String education,
            @RequestParam String experience,
            @RequestParam(required = false) MultipartFile resume
    ) {
        try {
            CandidateProfile saved = profileService.createOrUpdateProfile(
                   candidateId,  firstName, lastName, phone, education, experience, resume
            );
            return ResponseEntity.ok(saved);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error saving profile: " + e.getMessage());
        }
    }


    @GetMapping("/{candidateId}")
    public ResponseEntity<?> getProfile(@PathVariable Long candidateId) {
        CandidateProfile profile = profileService.getProfileByCandidateId(candidateId);
        if(profile == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(profile);
    }
}
