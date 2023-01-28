package com.backend.links.dto;

public class SessaoDTO {
    private String login;
    private String token;

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "SessaoDTO{" +
                "login='" + login + '\'' +
                ", token='" + token + '\'' +
                '}';
    }
}
