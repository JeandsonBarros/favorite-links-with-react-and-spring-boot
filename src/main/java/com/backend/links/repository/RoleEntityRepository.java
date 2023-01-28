package com.backend.links.repository;

import com.backend.links.models.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleEntityRepository extends JpaRepository<RoleEntity, Integer> {
    Optional<RoleEntity> findByRole(String role);
}
