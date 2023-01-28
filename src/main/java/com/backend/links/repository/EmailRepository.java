package com.backend.links.repository;

import com.backend.links.models.EmailEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailRepository extends JpaRepository<EmailEntity, Long> {
    Optional<EmailEntity> findByRecoveryCodeAndEmail(Long recoveryCode, String email);
    Optional<EmailEntity> findByEmail(String email);
}
