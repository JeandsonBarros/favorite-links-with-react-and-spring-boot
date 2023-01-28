package com.backend.links.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class EmailDTO {

    @Email(message = "must be a well-formed email address")
    @NotBlank(message = "email is required")
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
