package com.backend.links.config;

import com.backend.links.enums.RoleEnum;
import com.backend.links.models.LinksFolder;
import com.backend.links.models.Role;
import com.backend.links.models.UserAuth;
import com.backend.links.repository.LinksFolderRepository;
import com.backend.links.repository.RoleRepository;
import com.backend.links.repository.UserAuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Component
public class RoleConfigure implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserAuthRepository userAuthRepository;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private LinksFolderRepository linksFolderRepository;

    @Override
    public void run(String... args) {

        try {

            List<String> rolesString = new ArrayList<>() {{
                add(RoleEnum.ADMIN.toString());
                add(RoleEnum.USER.toString());
                add(RoleEnum.MASTER.toString());
            }};

            rolesString.forEach(roleString -> {
                Optional<Role> roleOptional = roleRepository.findByRole(roleString);
                if (!roleOptional.isPresent()) {
                    Role role = new Role();
                    role.setRole(roleString);
                    roleRepository.save(role);
                }
            });

            Optional<UserAuth> userEntity = userAuthRepository.findByEmail("master@email.com");
            if (!userEntity.isPresent()) {

                UserAuth newUser = new UserAuth();
                newUser.setName("Master");
                newUser.setEmail("master@email.com");
                newUser.setPassword(encoder.encode("zorosola"));
                Optional<Role> roleMaster = roleRepository.findByRole(RoleEnum.MASTER.toString());
                newUser.setRoles(Set.of(roleMaster.get()));
                newUser = userAuthRepository.save(newUser);

                LinksFolder linksFolder = new LinksFolder();
                linksFolder.setName("root");
                linksFolder.setUserAuth(newUser);
                linksFolderRepository.save(linksFolder);

                System.out.println("======= ACCOUNT MASTER CREATED =========");
                System.out.println("ID: " + newUser.getId());
                System.out.println("Name: " + newUser.getName());
                System.out.println("Email: " + newUser.getEmail());
                System.out.println("Password: zorosola");
                System.out.println("Role: MASTER");
                System.out.println("========================================");

            }

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
