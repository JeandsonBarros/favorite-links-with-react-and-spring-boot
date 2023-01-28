package com.backend.links.repository;

import com.backend.links.models.FavoriteLink;
import com.backend.links.models.LinksFolder;
import com.backend.links.models.UserAuth;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteLinkRepository extends JpaRepository<FavoriteLink, Long> {
    Page<FavoriteLink> findByUserAuth(UserAuth userAuth, Pageable pageable);
    Page<FavoriteLink> findByUserAuthAndLinksFolder(UserAuth userAuth, LinksFolder linksFolder, Pageable pageable);
    List<FavoriteLink> findByUserAuthAndLinksFolder(UserAuth userAuth, LinksFolder linksFolder);
    Page<FavoriteLink> findByUserAuthAndNameContaining(UserAuth userAuth, String name, Pageable pageable);
    Optional<FavoriteLink> findByUserAuthAndId(UserAuth userAuth, Long id);
}
