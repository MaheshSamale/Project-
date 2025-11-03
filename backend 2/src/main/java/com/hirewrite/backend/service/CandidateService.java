package com.hirewrite.backend.service;



import com.hirewrite.backend.entity.Candidate;
import com.hirewrite.backend.repository.CandidateRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;


@Service
public class CandidateService {

    @Autowired
    private CandidateRepository candidateRepository;

    // Login
    public Candidate login(String email, String password) throws Exception {
        Optional<Candidate> optionalCandidate = candidateRepository.findByEmail(email);
        if (optionalCandidate.isPresent()) {
            Candidate candidate = optionalCandidate.get();
            if (candidate.getPassword().equals(password)) {
                return candidate;
            } else {
                throw new Exception("Invalid password");
            }
        } else {
            throw new Exception("Candidate not found");
        }
    }

    // Register
    public Candidate save(Candidate candidate) {
        candidateRepository.save(candidate);
            return candidate;
    }

    // Update candidate email and skills
    public Candidate updateCandidate(Long id, String email, String skills) throws Exception {
        Candidate candidate = candidateRepository.findById(id)
                .orElseThrow(() -> new Exception("Candidate not found"));
        candidate.setEmail(email);
        candidate.setSkills(skills);
        return candidateRepository.save(candidate);
    }

    // Get candidate by ID
    public Candidate getCandidateById(Long id) throws Exception {
        return candidateRepository.findById(id)
                .orElseThrow(() -> new Exception("Candidate not found"));
    }
}



