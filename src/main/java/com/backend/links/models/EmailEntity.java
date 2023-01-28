package com.backend.links.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tab_email")
public class EmailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(nullable = false)
    private String email;
    private String subject;
    @Column(nullable = false, unique = true)
    private Long recoveryCode;
    @Column(nullable = false)
    private Long codeExpirationTime;
    @Column(nullable = false)
    private LocalDateTime sendDateEmail;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getRecoveryCode() {
        return recoveryCode;
    }

    public void setRecoveryCode(Long recoveryCode) {
        this.recoveryCode = recoveryCode;
    }

    public Long getCodeExpirationTime() {
        return codeExpirationTime;
    }

    public void setCodeExpirationTime(Long codeExpirationTime) {
        this.codeExpirationTime = codeExpirationTime;
    }

    public LocalDateTime getSendDateEmail() {
        return sendDateEmail;
    }

    public void setSendDateEmail(LocalDateTime sendDateEmail) {
        this.sendDateEmail = sendDateEmail;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    @Override
    public String toString() {
        return "EmailEntity{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", recoveryCode=" + recoveryCode +
                ", codeExpirationTime=" + codeExpirationTime +
                ", sendDateEmail=" + sendDateEmail +
                '}';
    }
}
