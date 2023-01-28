package com.backend.links.controllers;

import com.backend.links.dto.ChangeForgottenPasswordDTO;
import com.backend.links.dto.EmailDTO;
import com.backend.links.services.EmailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/email-for-forgot-password")
@Tag(name = "Email for forgot password")
public class EmailForForgotPasswordController {

    @Autowired
    private EmailService emailService;

    @Operation(summary = "Send email code to change forgotten password | Authority: permit all")
    @PostMapping("/send-email")
    public ResponseEntity<Object> sendEmail(@RequestBody EmailDTO emailDTO) {
      return emailService.sendEmail(emailDTO.getEmail());
    }

    @Operation(summary = "Change forgotten password using the code that was sent to the email | Authority: permit all")
    @PostMapping("/change-forgotten-password")
    public ResponseEntity<Object> changeForgottenPassword(@RequestBody ChangeForgottenPasswordDTO changeForgottenPasswordDTO) {
        return emailService.changeForgottenPassword(changeForgottenPasswordDTO);
    }


}
