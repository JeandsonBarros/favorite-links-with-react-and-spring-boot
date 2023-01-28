package com.backend.links.repository;

import com.backend.links.models.FavoriteLinkEntity;
import com.backend.links.models.LinksFolderEntity;
import com.backend.links.models.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LinksFolderRepository extends JpaRepository<LinksFolderEntity, Long> {
    Page<LinksFolderEntity> findByUserEntity(UserEntity userEntity, Pageable pageable);
    Page<LinksFolderEntity> findByUserEntityAndNameContaining(UserEntity userEntity, String name, Pageable pageable);
    Optional<LinksFolderEntity> findByUserEntityAndId(UserEntity userEntity, Long id);
}
