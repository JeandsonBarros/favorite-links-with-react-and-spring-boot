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
    List<FavoriteLink> findByUserAuth(UserAuth userAuth);
    List<FavoriteLink> findByUserAuthAndLinksFolder(UserAuth userAuth, LinksFolder linksFolder);
    List<FavoriteLink> findByUserAuthAndNameContaining(UserAuth userAuth, String name);
    Optional<FavoriteLink> findByUserAuthAndId(UserAuth userAuth, Long id);
}
