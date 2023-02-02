package com.backend.links.repository;

import com.backend.links.models.LinksFolder;
import com.backend.links.models.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LinksFolderRepository extends JpaRepository<LinksFolder, Long> {
    List<LinksFolder> findByUserAuth(UserAuth userAuth);
    List<LinksFolder> findByUserAuthAndNameContaining(UserAuth userAuth, String name);
    Optional<LinksFolder> findByUserAuthAndName(UserAuth userAuth, String name);
    Optional<LinksFolder> findByUserAuthAndId(UserAuth userAuth, Long id);
}
