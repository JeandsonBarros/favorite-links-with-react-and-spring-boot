package com.backend.links.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class WelcomeController {

    @GetMapping("/")
    public String getHome(){
        return "redirect:/swagger-ui/index.html";
    }


}
