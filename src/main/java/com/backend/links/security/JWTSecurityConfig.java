package com.backend.links.security;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "security.token.config")
public class JWTSecurityConfig {

    private String prefix/* = "Bearer"*/;
    private String key/* = "463408a1-54c9-4307-bb1c-6cced559f5a7"*/;
    private Long expiration/* = 3600000L*/;

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public Long getExpiration() {
        return expiration;
    }

    public void setExpiration(Long expiration) {
        this.expiration = expiration;
    }

    @Override
    public String toString() {
        return "JWTSecurityConfig{" +
                "prefix='" + prefix + '\'' +
                ", key='" + key + '\'' +
                ", expiration=" + expiration +
                '}';
    }
}
