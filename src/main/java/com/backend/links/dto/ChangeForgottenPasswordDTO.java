package com.backend.links.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ChangeForgottenPasswordDTO {

    @Email(message = "must be a well-formed email address")
    @NotBlank(message = "email is required")
    private String email;
    @NotBlank(message = "newPassword is required")
    private String newPassword;
    @NotNull(message = "code is required")
    private Long recoveryCode;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public Long getRecoveryCode() {
        return recoveryCode;
    }

    public void setRecoveryCode(Long recoveryCode) {
        this.recoveryCode = recoveryCode;
    }

    @Override
    public String toString() {
        return "ChangeForgottenPasswordDTO{" +
                "email='" + email + '\'' +
                ", newPassword='" + newPassword + '\'' +
                ", recoveryCode=" + recoveryCode +
                '}';
    }
}
