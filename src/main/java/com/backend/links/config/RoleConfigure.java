package com.backend.links.config;


import com.backend.links.enums.Role;
import com.backend.links.models.LinksFolderEntity;
import com.backend.links.models.RoleEntity;
import com.backend.links.models.UserEntity;
import com.backend.links.repository.LinksFolderRepository;
import com.backend.links.repository.RoleEntityRepository;
import com.backend.links.repository.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class RoleConfigure implements CommandLineRunner {

    @Autowired
    private RoleEntityRepository roleEntityRepository;

    @Autowired
    private UserEntityRepository userEntityRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private LinksFolderRepository linksFolderRepository;

    @Override
    public void run(String... args) {

        try {

            List<String> rolesString = new ArrayList<>() {{
                add(Role.ADMIN.toString());
                add(Role.USER.toString());
                add(Role.MASTER.toString());
            }};

            rolesString.forEach(roleString -> {
                Optional<RoleEntity> roleOptional = roleEntityRepository.findByRole(roleString);
                if (!roleOptional.isPresent()) {
                    RoleEntity roleEntity = new RoleEntity();
                    roleEntity.setRole(roleString);
                    roleEntityRepository.save(roleEntity);
                }
            });

            Optional<UserEntity> userEntity = userEntityRepository.findByEmail("geoo677@gmail.com");
            if(!userEntity.isPresent()){

                UserEntity newUser = new UserEntity();
                newUser.setName("Jeandson Barros");
                newUser.setEmail("geoo677@gmail.com");
                newUser.setPassword(encoder.encode("zorosola"));
                Optional<RoleEntity> roleMaster = roleEntityRepository.findByRole(Role.MASTER.toString());
                newUser.setRoles(List.of(roleMaster.get()));
                newUser= userEntityRepository.save(newUser);

                System.out.println("======= ACCOUNT MASTER CREATED =========");
                System.out.println("ID: "+newUser.getId());
                System.out.println("Name: "+newUser.getName());
                System.out.println("Email: "+newUser.getEmail());
                System.out.println("Password: zorosola");
                System.out.println("Role: MASTER");
                System.out.println("========================================");

            }

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
