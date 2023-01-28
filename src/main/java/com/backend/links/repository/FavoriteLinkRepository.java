package com.backend.links.repository;


import com.backend.links.models.FavoriteLinkEntity;
import com.backend.links.models.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FavoriteLinkRepository extends JpaRepository<FavoriteLinkEntity, Long> {
    Page<FavoriteLinkEntity> findByUserEntity(UserEntity userEntity, Pageable pageable);
    Page<FavoriteLinkEntity> findByUserEntityAndNameContaining(UserEntity userEntity, String name, Pageable pageable);
    Optional<FavoriteLinkEntity> findByUserEntityAndId(UserEntity userEntity, Long id);
}
