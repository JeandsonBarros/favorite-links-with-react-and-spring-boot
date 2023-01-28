package com.backend.links.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="tab_links_folder")
public class LinksFolderEntity {
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
    private UserEntity userEntity;

    @OneToMany(fetch = FetchType.EAGER)
    private Set<FavoriteLinkEntity> favoriteLinkEntities = new HashSet<>();

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
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

    public Set<FavoriteLinkEntity> getFavoriteLinkEntities() {
        return favoriteLinkEntities;
    }

    public void setFavoriteLinkEntities(Set<FavoriteLinkEntity> favoriteLinkEntities) {
        this.favoriteLinkEntities = favoriteLinkEntities;
    }

    public void setFavoriteLinkEntities(FavoriteLinkEntity favoriteLinkEntity) {
        this.favoriteLinkEntities.add(favoriteLinkEntity);
    }

    @Override
    public String toString() {
        return "LinksFolderEntity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", userEntity=" + userEntity +
                ", favoriteLinkEntities=" + favoriteLinkEntities +
                '}';
    }
}
