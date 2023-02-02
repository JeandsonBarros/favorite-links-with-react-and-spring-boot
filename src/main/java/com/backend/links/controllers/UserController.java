package com.backend.links.controllers;

import com.backend.links.dto.LoginDTO;
import com.backend.links.dto.UserDTO;
import com.backend.links.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin
@RequestMapping("/user/")
@Tag(name = "User")
public class UserController {

    @Autowired
    private UserService userService;

    @Operation(summary = "Get all users | Authority: ADMIN, MASTER")
    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping("/list-all-users")
    public ResponseEntity<Object> getAllUsers(@PageableDefault(size = 30, page = 0) Pageable paging){
        Pageable pageable = PageRequest.of(paging.getPageNumber(), paging.getPageSize(), Sort.by(
                Sort.Order.asc("name")));

        return userService.getAllUsers(pageable);
    }

    @Operation(summary = "New user registration | Authority: permit all")
    @PostMapping("/register")
    public ResponseEntity<Object> postSalvarUsuario(@Valid @RequestBody UserDTO userDTO, BindingResult result) {

        if (result.hasErrors())
            return listErrors(result);

        return userService.createUser(userDTO);
    }

    @Operation(summary = "Login | Authority: permit all")
    @PostMapping("/login")
    public ResponseEntity<Object> logar(@Valid @RequestBody LoginDTO login, BindingResult result) {

        if (result.hasErrors())
            return listErrors(result);

        return userService.logar(login);
    }

    @Operation(summary = "Get authenticated user data | Authority: ADMIN, MASTER, USER")
    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping("/data")
    public ResponseEntity<Object> getUserDataLogged() {
        return userService.getUserData();
    }

    @Operation(summary = "Update user authenticated data | Authority: ADMIN, MASTER, USER")
    @SecurityRequirement(name = "Bearer Authentication")
    @PutMapping("/update")
    public ResponseEntity<Object> putUserLogged(@Valid @RequestBody UserDTO userDTO, BindingResult result) {

        if (result.hasErrors())
            return listErrors(result);

        return userService.updateUserLogged(userDTO);
    }

    @Operation(summary = "Update partial authenticated user data | Authority: ADMIN, MASTER, USER")
    @SecurityRequirement(name = "Bearer Authentication")
    @PatchMapping("/update")
    public ResponseEntity<Object> patchUserLogged(@Valid @RequestBody UserDTO userDTO, BindingResult result) {

        if (userDTO.getEmail() != null && !userDTO.getEmail().isEmpty())
            if (result.hasFieldErrors("email"))
                return new ResponseEntity<>("must be a well-formed email address", HttpStatus.BAD_REQUEST);

        return userService.updateUserLogged(userDTO);
    }

    @Operation(summary = "Delete account authenticated | Authority: ADMIN, MASTER, USER")
    @SecurityRequirement(name = "Bearer Authentication")
    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteUserAccountLogged() {
        return userService.deleteUserAccount();
    }

    @Operation(summary = "Delete account of one user by email | Authority: MASTER")
    @SecurityRequirement(name = "Bearer Authentication")
    @DeleteMapping("/delete-one-user/{email}")
    public ResponseEntity<Object> deleteOneUser(@PathVariable String email) {
        return userService.deleteOneUser(email);
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
