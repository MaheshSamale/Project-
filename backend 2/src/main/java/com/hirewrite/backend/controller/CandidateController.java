package com.hirewrite.backend.controller;


import com.hirewrite.backend.entity.Candidate;
import com.hirewrite.backend.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/candidate")
@CrossOrigin(origins = "*")
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Candidate loginRequest) {
        try {
            Candidate candidate = candidateService.login(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(candidate);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    //Regiister
    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody Candidate candidate) {
        try {
            Candidate candidate1 = candidateService.save(candidate);
            return ResponseEntity.ok(candidate1);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    // UPDATE EMAIL & SKILLS
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCandidate(@PathVariable Long id, @RequestBody Candidate updated) {
        try {
            Candidate candidate = candidateService.updateCandidate(id, updated.getEmail(), updated.getSkills());
            return ResponseEntity.ok(candidate);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    // GET CANDIDATE BY ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getCandidate(@PathVariable Long id) {
        try {
            Candidate candidate = candidateService.getCandidateById(id);
            return ResponseEntity.ok(candidate);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}


