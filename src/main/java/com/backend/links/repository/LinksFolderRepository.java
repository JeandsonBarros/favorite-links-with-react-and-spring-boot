package com.backend.links.repository;

import com.backend.links.models.LinksFolder;
import com.backend.links.models.UserAuth;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LinksFolderRepository extends JpaRepository<LinksFolder, Long> {
    Page<LinksFolder> findByUserAuth(UserAuth userAuth, Pageable pageable);
    Page<LinksFolder> findByUserAuthAndNameContaining(UserAuth userAuth, String name, Pageable pageable);
    Optional<LinksFolder> findByUserAuthAndId(UserAuth userAuth, Long id);
}
