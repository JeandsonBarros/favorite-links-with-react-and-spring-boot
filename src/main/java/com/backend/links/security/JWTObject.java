package com.backend.links.security;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class JWTObject {

    private String subject; // username or email of the user
    private Long userId;
    private Date issuedAt; // token Creation Date
    private Date expiration; // token expiration date
    private List<String> roles = new ArrayList<>(); // access profile functions

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Date getIssuedAt() {
        return issuedAt;
    }

    public void setIssuedAt(Date issuedAt) {
        this.issuedAt = issuedAt;
    }

    public Date getExpiration() {
        return expiration;
    }

    public void setExpiration(Date expiration) {
        this.expiration = expiration;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    @Override
    public String toString() {
        return "JWTObject{" +
                "subject='" + subject + '\'' +
                ", userId=" + userId +
                ", issuedAt=" + issuedAt +
                ", expiration=" + expiration +
                ", roles=" + roles +
                '}';
    }
}
