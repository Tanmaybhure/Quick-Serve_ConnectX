package com.project.projectService.Controller;

import com.project.projectService.DTO.LoginRequest;
import com.project.projectService.DTO.SignUpRequest;
import com.project.projectService.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api")
@RestController
public class loginController {
    @Autowired
    UserService userService;
    @PostMapping("/login")
    public Boolean loginDemo(@RequestBody LoginRequest loginRequest){
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        System.out.println(email+" "+password);
        return  null;
    }
    @PostMapping("/signup")
    public boolean signup(@RequestBody SignUpRequest signUpRequest){
        System.out.println(signUpRequest.toString());
        return userService.saveUser(signUpRequest) != null;
    }
}
