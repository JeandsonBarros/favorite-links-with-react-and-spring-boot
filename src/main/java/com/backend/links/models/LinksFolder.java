package com.backend.links.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.*;

@Entity
@Table(name="tab_links_folder")
public class LinksFolder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(nullable = false)
    private String name;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_entity_id_user")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserAuth userAuth;

    @JsonIgnore
    @OneToMany
    private List<FavoriteLink> favoriteLinks = new ArrayList<>();

    public UserAuth getUserEntity() {
        return userAuth;
    }

    public void setUserEntity(UserAuth userAuth) {
        this.userAuth = userAuth;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<FavoriteLink> getFavoriteLinks() {
        return favoriteLinks;
    }

    public void setFavoriteLinks(List<FavoriteLink> favoriteLinks) {
        this.favoriteLinks = favoriteLinks;
    }

    public void setFavoriteLinkEntities(FavoriteLink favoriteLink) {
        this.favoriteLinks.add(favoriteLink);
    }

    @Override
    public String toString() {
        return "LinksFolderEntity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", userAuth=" + userAuth +
                ", favoriteLinkEntities=" + favoriteLinks +
                '}';
    }
}
