package com.backend.links.controllers;

import com.backend.links.dto.LoginDTO;
import com.backend.links.dto.UserDTO;
import com.backend.links.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin
@RequestMapping("/user/")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Object> postSalvarUsuario(@Valid @RequestBody UserDTO userDTO, BindingResult result) {

        if (result.hasErrors())
            return listErrors(result);

        return userService.createUser(userDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> logar(@Valid @RequestBody LoginDTO login, BindingResult result) {

        if (result.hasErrors())
            return listErrors(result);

        return userService.logar(login);
    }

    @GetMapping("/data")
    public ResponseEntity<Object> getUserDataLogged() {
        return userService.getUserData();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteUserAccountLogged() {
        return userService.deleteUserAccount();
    }

    @PutMapping("/update")
    public ResponseEntity<Object> putUserLogged(@Valid @RequestBody UserDTO userDTO, BindingResult result) {

        if (userDTO.getEmail() != null && !userDTO.getEmail().isEmpty())
            if (result.hasFieldErrors("email"))
                return new ResponseEntity<>("must be a well-formed email address", HttpStatus.BAD_REQUEST);

        return userService.updateUserLogged(userDTO);
    }

    @PatchMapping("/update")
    public ResponseEntity<Object> patchUserLogged(@Valid @RequestBody UserDTO userDTO, BindingResult result) {

        if (result.hasErrors())
            return listErrors(result);

        return userService.updateUserLogged(userDTO);
    }

    public ResponseEntity<Object> listErrors(BindingResult result) {

        var erros = new ArrayList<>();

        for (ObjectError objectError : result.getAllErrors()) {
            String defaultMessage = objectError.getDefaultMessage();
            erros.add(defaultMessage);
        }

        return new ResponseEntity<>(erros, HttpStatus.BAD_REQUEST);
    }

}
