package com.hirewrite.backend.repository;



import com.hirewrite.backend.entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    Candidate findByEmailAndPassword(String email, String password);
    Optional<Candidate> findByEmail(String email);
}



