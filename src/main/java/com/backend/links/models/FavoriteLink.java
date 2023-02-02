package com.backend.links.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "tab_favorite_link")
public class FavoriteLink {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String url;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_entity_id_user")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserAuth userAuth;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(nullable = false)
    private LinksFolder linksFolder;

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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public LinksFolder getLinksFolder() {
        return linksFolder;
    }

    public void setLinksFolder(LinksFolder linksFolder) {
        this.linksFolder = linksFolder;
    }

    public UserAuth getUserEntity() {
        return userAuth;
    }

    public void setUserEntity(UserAuth userAuth) {
        this.userAuth = userAuth;
    }

    @Override
    public String toString() {
        return "FavoriteLinkEntity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", url='" + url + '\'' +
                ", userAuth=" + userAuth +
                ", linksFolderEntity=" + linksFolder +
                '}';
    }
}
