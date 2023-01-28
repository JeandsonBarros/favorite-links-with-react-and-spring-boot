package com.backend.links.services;

import com.backend.links.dto.LoginDTO;
import com.backend.links.dto.SessaoDTO;
import com.backend.links.dto.UserDTO;
import com.backend.links.enums.RoleEnum;
import com.backend.links.models.Role;
import com.backend.links.models.UserAuth;
import com.backend.links.repository.LinksFolderRepository;
import com.backend.links.repository.RoleRepository;
import com.backend.links.repository.UserAuthRepository;
import com.backend.links.security.JWTCreator;
import com.backend.links.security.JWTObject;
import com.backend.links.security.JWTSecurityConfig;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
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
    private RoleRepository roleRepository;
    @Autowired
    private UserAuthRepository userAuthRepository;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private JWTSecurityConfig jwtSecurityConfig;

    @Autowired
    private LinksFolderRepository linksFolderRepository;

    public ResponseEntity<Object> getAllUsers(Pageable pageable) {
        try {
            return new ResponseEntity<>(userAuthRepository.findAll(pageable), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> logar(@RequestBody LoginDTO login) {

        Optional<UserAuth> user = userAuthRepository.findByEmail(login.getEmail());

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
            for (Role item : user.get().getRoles()) {
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

            UserAuth newUser = new UserAuth();
            BeanUtils.copyProperties(userDTO, newUser);
            newUser.setPassword(encoder.encode(userDTO.getPassword()));
            Optional<Role> roleUser = roleRepository.findByRole(RoleEnum.USER.toString());
            newUser.setRoles(List.of(roleUser.get()));

            UserAuth saveUser = userAuthRepository.save(newUser);

            return new ResponseEntity<>(saveUser, HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> getUserData() {
        try {
            return new ResponseEntity<>(getUserDataLogged(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> updateUserLogged(UserDTO userDTO) {
        try {

            UserAuth userLogged = getUserDataLogged();

            if (userDTO.getEmail() != null && !userDTO.getEmail().isEmpty()) {
                if (userAuthRepository.findByEmail(userDTO.getEmail()).isPresent() && !userDTO.getEmail().equals(userLogged.getEmail())) {
                    return new ResponseEntity<>("This email is unavailable", HttpStatus.BAD_REQUEST);
                } else {
                    userLogged.setEmail(userDTO.getEmail());
                }
            }
            if (userDTO.getName() != null && !userDTO.getName().isEmpty())
                userLogged.setName(userDTO.getName());

            if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty())
                userLogged.setPassword(encoder.encode(userDTO.getPassword()));

            userAuthRepository.save(userLogged);

            return new ResponseEntity<>("Successfully updated", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> deleteUserAccount() {
        try {

            UserAuth userAuth = getUserDataLogged();
            userAuthRepository.delete(userAuth);
            return new ResponseEntity<>("account deleted", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> deleteOneUser(String email) {
        try {

            Optional<UserAuth> userEntity = userAuthRepository.findByEmail(email);

            if(!userEntity.isPresent())
                return new ResponseEntity<>("User with email "+email+" not found ", HttpStatus.NOT_FOUND);

            userAuthRepository.delete(userEntity.get());
            return new ResponseEntity<>("account with email "+email+" deleted", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public UserAuth getUserDataLogged() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserAuth> userEntity = userAuthRepository.findByEmail(auth.getName());
        return userEntity.get();
    }


}
