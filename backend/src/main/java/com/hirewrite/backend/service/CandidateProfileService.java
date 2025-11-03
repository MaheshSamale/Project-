package com.hirewrite.backend.service;


import com.hirewrite.backend.entity.CandidateProfile;
import com.hirewrite.backend.repository.CandidateProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;

@Service
public class CandidateProfileService {

    @Autowired
    private CandidateProfileRepository profileRepository;



    private final String uploadDir = "uploads/resumes/";

    public CandidateProfile createOrUpdateProfile(Long candidateId,
                                                  String firstName,
                                                  String lastName,
                                                  String phone,
                                                  String education,
                                                  String experience,
                                                  MultipartFile resume) throws IOException {

        CandidateProfile profile = profileRepository.getReferenceById(candidateId);
        if(profile == null) profile = new CandidateProfile();
//        CandidateProfile profile = new CandidateProfile();

        profile.setCandidateId(candidateId);
        profile.setFirstName(firstName);
        profile.setLastName(lastName);
        profile.setPhone(phone);
        profile.setEducation(education);
        profile.setExperience(experience);

        if (resume != null && !resume.isEmpty()) {
            String fileName = candidateId + "_" + resume.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);
            Files.createDirectories(filePath.getParent());
            Files.copy(resume.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            profile.setResumePath(filePath.toString());
        }

        return profileRepository.save(profile);
    }

    public CandidateProfile getProfileByCandidateId(Long candidateId) {
        return profileRepository.findByCandidateId(candidateId);
    }


}

