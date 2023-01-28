package com.backend.links.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class FavoriteLinkDTO {

    @NotBlank(message="name is required")
    private String name;

    @NotBlank(message="url is required")
    private String url;

    /*@NotNull(message="folderId is required")*/
    private Long folderId;

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

    public Long getFolderId() {
        return folderId;
    }

    public void setFolderId(Long folderId) {
        this.folderId = folderId;
    }

    @Override
    public String toString() {
        return "FavoriteLinkDTO{" +
                "name='" + name + '\'' +
                ", url='" + url + '\'' +
                ", folderId=" + folderId +
                '}';
    }
}
