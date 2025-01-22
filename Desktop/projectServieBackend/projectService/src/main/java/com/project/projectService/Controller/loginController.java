package com.project.projectService.Controller;

import com.project.projectService.DTO.LoginRequest;
import com.project.projectService.DTO.SignUpCustomerDTO;
import com.project.projectService.DTO.SignUpServiceProviderDTO;
import com.project.projectService.DTO.locationServiceProviderDTO;
import com.project.projectService.Model.mySQLModel.Customer;
import com.project.projectService.Model.mySQLModel.ServiceProvider;
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
    public Customer loginCustomer(@RequestBody LoginRequest loginRequest){
        return userService.authCheckService(loginRequest);
    }
    @PostMapping("/login-service")
    public ServiceProvider loginService(@RequestBody LoginRequest loginRequest){
        return userService.authCheckServiceProvider(loginRequest);
    }
    @PostMapping("/signup")
    public boolean signup(@RequestBody SignUpCustomerDTO signUpCustomerDTO){
        System.out.println(signUpCustomerDTO.toString());
        return userService.saveUser(signUpCustomerDTO) != null;
    }
    @PostMapping("/signup-service")
    public boolean signupService(@RequestBody SignUpServiceProviderDTO signUpServiceProviderDTO){
        return userService.saveServiceProvider(signUpServiceProviderDTO) !=null ;
    }
    @PostMapping("/service-provider-location")
    public boolean saveServiceProviderlocation(@RequestBody locationServiceProviderDTO location){
        return userService.saveLocationPg(location) != null;
    }
}
