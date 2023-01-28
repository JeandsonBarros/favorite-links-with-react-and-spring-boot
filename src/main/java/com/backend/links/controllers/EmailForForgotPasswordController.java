package com.backend.links.controllers;

import com.backend.links.dto.ChangeForgottenPasswordDTO;
import com.backend.links.dto.EmailDTO;
import com.backend.links.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/email-for-forgot-password")
public class EmailForForgotPasswordController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-email")
    public ResponseEntity<Object> sendEmail(@RequestBody EmailDTO emailDTO) {
      return emailService.sendEmail(emailDTO.getEmail());
    }

    @PostMapping("/change-forgotten-password")
    public ResponseEntity<Object> changeForgottenPassword(@RequestBody ChangeForgottenPasswordDTO changeForgottenPasswordDTO) {
        return emailService.changeForgottenPassword(changeForgottenPasswordDTO);
    }


}
