package com.backend.links.models;

import jakarta.persistence.*;

@Entity
@Table(name = "tab_role")
public class RoleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_role")
    private Integer id;
    @Column(nullable = false, unique = true)
    private String role;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "RoleEntity{" +
                "id=" + id +
                ", Role='" + role + '\'' +
                '}';
    }
}
