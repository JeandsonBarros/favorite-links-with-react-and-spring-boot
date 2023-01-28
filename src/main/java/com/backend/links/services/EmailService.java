package com.backend.links.services;

import com.backend.links.dto.ChangeForgottenPasswordDTO;
import com.backend.links.models.Email;
import com.backend.links.models.UserAuth;
import com.backend.links.repository.EmailRepository;
import com.backend.links.repository.UserAuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class EmailService {

    @Autowired
    private UserAuthRepository userAuthRepository;

    @Autowired
    private EmailRepository emailRepository;

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private PasswordEncoder encoder;

    public ResponseEntity<Object> sendEmail(String emailTo) {

        try {

            if (!userAuthRepository.findByEmail(emailTo).isPresent())
                return new ResponseEntity<>("There is no account registered with this email: " + emailTo, HttpStatus.NOT_FOUND);

            Long recoveryCode = ThreadLocalRandom.current().nextLong(1000000, 2000000);

            var emailIsPresent = emailRepository.findByEmail(emailTo);
            emailIsPresent.ifPresent(model -> emailRepository.delete(model));

            Email email = new Email();
            email.setEmail(emailTo);
            email.setSendDateEmail(LocalDateTime.now());
            email.setRecoveryCode(recoveryCode);
            email.setSubject("You recovery code is " + recoveryCode + ", valid for 15 minutes.");
            email.setCodeExpirationTime(System.currentTimeMillis() + 900000);

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("jeandson.developer@gmail.com");
            message.setTo(email.getEmail());
            message.setSubject("Favorite links - password recovery code");
            message.setText(email.getSubject());
            emailSender.send(message);

            emailRepository.save(email);

            return new ResponseEntity<>("Email successfully sent", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error sending email", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> changeForgottenPassword(ChangeForgottenPasswordDTO changeForgottenPasswordDTO) {
        try {
            Optional<Email> email = emailRepository.findByRecoveryCodeAndEmail(changeForgottenPasswordDTO.getRecoveryCode(), changeForgottenPasswordDTO.getEmail());

            if (!userAuthRepository.findByEmail(changeForgottenPasswordDTO.getEmail()).isPresent())
                return new ResponseEntity<>("User with email not found: " + changeForgottenPasswordDTO.getEmail(), HttpStatus.NOT_FOUND);

            if (!email.isPresent())
                return new ResponseEntity<>("Code entered is incorrect or does not exist: " + changeForgottenPasswordDTO.getEmail(), HttpStatus.NOT_FOUND);

            if (System.currentTimeMillis() > email.get().getCodeExpirationTime())
                return new ResponseEntity<>("Code entered is expired", HttpStatus.BAD_REQUEST);

            UserAuth user = userAuthRepository.findByEmail(changeForgottenPasswordDTO.getEmail()).get();
            user.setPassword(encoder.encode(changeForgottenPasswordDTO.getNewPassword()));
            userAuthRepository.save(user);

            return new ResponseEntity<>("updated password", HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
