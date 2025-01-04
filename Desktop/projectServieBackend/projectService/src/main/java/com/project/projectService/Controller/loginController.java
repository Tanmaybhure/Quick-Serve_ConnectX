package com.project.projectService.Controller;

import com.project.projectService.DTO.LoginRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api")
@RestController
public class loginController {
    @PostMapping("/login")
    public Boolean loginDemo(@RequestBody LoginRequest loginRequest){
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        System.out.println(email+" "+password);
        return  true;
    }
}
