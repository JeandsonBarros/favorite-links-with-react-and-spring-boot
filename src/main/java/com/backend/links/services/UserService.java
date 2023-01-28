package com.backend.links.services;

import com.backend.links.dto.LoginDTO;
import com.backend.links.dto.SessaoDTO;
import com.backend.links.dto.UserDTO;
import com.backend.links.enums.Role;
import com.backend.links.models.LinksFolderEntity;
import com.backend.links.models.RoleEntity;
import com.backend.links.models.UserEntity;
import com.backend.links.repository.LinksFolderRepository;
import com.backend.links.repository.RoleEntityRepository;
import com.backend.links.repository.UserEntityRepository;
import com.backend.links.security.JWTCreator;
import com.backend.links.security.JWTObject;
import com.backend.links.security.JWTSecurityConfig;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private RoleEntityRepository roleEntityRepository;
    @Autowired
    private UserEntityRepository userEntityRepository;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private JWTSecurityConfig jwtSecurityConfig;

    @Autowired
    private LinksFolderRepository linksFolderRepository;

    public ResponseEntity<Object> logar(@RequestBody LoginDTO login) {

        Optional<UserEntity> user = userEntityRepository.findByEmail(login.getEmail());

        if (user.isPresent()) {

            boolean passwordOk = encoder.matches(login.getPassword(), user.get().getPassword());

            if (!passwordOk) {
                return new ResponseEntity<>("Incorrect password for email: " + login.getEmail(), HttpStatus.UNAUTHORIZED);
            }

            //We are sending a Session object to return more information from the user
            SessaoDTO sessao = new SessaoDTO();
            sessao.setLogin(user.get().getEmail());

            JWTObject jwtObject = new JWTObject();
            jwtObject.setSubject(user.get().getEmail());
            jwtObject.setUserId(user.get().getId());
            jwtObject.setIssuedAt(new Date(System.currentTimeMillis()));
            jwtObject.setExpiration((new Date(System.currentTimeMillis() + jwtSecurityConfig.getExpiration())));

            List<String> listRoles = new ArrayList<>();
            for (RoleEntity item : user.get().getRoles()) {
                String role = item.getRole();
                listRoles.add(role);
            }

            jwtObject.setRoles(listRoles);

            sessao.setToken(JWTCreator.create(jwtSecurityConfig.getPrefix(), jwtSecurityConfig.getKey(), jwtObject));

            return new ResponseEntity<>(sessao, HttpStatus.CREATED);

        } else {
            return new ResponseEntity<>("User with email '" + login.getEmail() + "' not found", HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<Object> createUser(UserDTO userDTO) {
        try {

            UserEntity newUser = new UserEntity();
            BeanUtils.copyProperties(userDTO, newUser);
            newUser.setPassword(encoder.encode(userDTO.getPassword()));
            Optional<RoleEntity> roleUser = roleEntityRepository.findByRole(Role.USER.toString());
            newUser.setRoles(List.of(roleUser.get()));

            UserEntity saveUser = userEntityRepository.save(newUser);

            return new ResponseEntity<>(saveUser, HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> getUserData() {
        try {

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            Optional<UserEntity> userEntity = userEntityRepository.findByEmail(auth.getName());
            return new ResponseEntity<>(userEntity.get(), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> deleteUserAccount() {
        try {

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            Optional<UserEntity> userEntity = userEntityRepository.findByEmail(auth.getName());
            userEntityRepository.delete(userEntity.get());
            return new ResponseEntity<>("account deleted", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> updateUserLogged(UserDTO userDTO) {
        try {

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            UserEntity userLogged = userEntityRepository.findByEmail(auth.getName()).get();

            if (userDTO.getEmail() != null && !userDTO.getEmail().isEmpty()) {
                if (userEntityRepository.findByEmail(userDTO.getEmail()).isPresent() && !userDTO.getEmail().equals(userLogged.getEmail())) {
                    return new ResponseEntity<>("This email is unavailable", HttpStatus.BAD_REQUEST);
                } else {
                    userLogged.setEmail(userDTO.getEmail());
                }
            }
            if (userDTO.getName() != null && !userDTO.getName().isEmpty())
                userLogged.setName(userDTO.getName());

            if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty())
                userLogged.setPassword(encoder.encode(userDTO.getPassword()));

            userEntityRepository.save(userLogged);

            return new ResponseEntity<>("Successfully updated", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public UserEntity getUserDataLogged(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserEntity> userEntity = userEntityRepository.findByEmail(auth.getName());
        return userEntity.get();
    }

}
