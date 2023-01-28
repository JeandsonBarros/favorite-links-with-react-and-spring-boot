package com.backend.links.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
public class FavoriteLinkEntity {
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
    private UserEntity userEntity;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private LinksFolderEntity linksFolderEntity;

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

    public LinksFolderEntity getLinksFolderEntity() {
        return linksFolderEntity;
    }

    public void setLinksFolderEntity(LinksFolderEntity linksFolderEntity) {
        this.linksFolderEntity = linksFolderEntity;
    }

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    @Override
    public String toString() {
        return "FavoriteLinkEntity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", url='" + url + '\'' +
                ", userEntity=" + userEntity +
                ", linksFolderEntity=" + linksFolderEntity +
                '}';
    }
}
