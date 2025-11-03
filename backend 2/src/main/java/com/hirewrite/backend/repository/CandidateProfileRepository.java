package com.hirewrite.backend.repository;

import com.hirewrite.backend.entity.CandidateProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CandidateProfileRepository extends JpaRepository<CandidateProfile, Long> {
    CandidateProfile findByCandidateId(Long candidateId);
}
