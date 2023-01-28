package com.backend.links.repository;

import com.backend.links.models.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmailRepository extends JpaRepository<Email, Long> {
    Optional<Email> findByRecoveryCodeAndEmail(Long recoveryCode, String email);
    Optional<Email> findByEmail(String email);
}
