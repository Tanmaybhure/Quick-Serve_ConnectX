package com.project.projectService.Controller;

import com.project.projectService.DTO.*;
import com.project.projectService.Model.NormalModel.ReturnServiceProvider;
import com.project.projectService.Model.mySQLModel.Customer;
import com.project.projectService.Model.mySQLModel.ServiceProvider;
import com.project.projectService.Service.NearestProviderService;
import com.project.projectService.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
@RestController
public class loginController {
    public String latitude;
    public String longitude;
    @Autowired
    UserService userService;
    @Autowired
    NearestProviderService nearService;
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
    @PostMapping("/update-location")
    public boolean getCustomerLocation(@RequestBody customerCurrentLocationDTO location){
        latitude= location.getLatitude();
        longitude= location.getLongitude();
        System.out.println("controller1: "+latitude+" "+longitude);
        return (latitude!=null && longitude!=null);
    }
    @GetMapping("/user-details")
    public ResponseEntity<ServiceProvider> sendUserToDashboard(@RequestParam String email){
        ServiceProvider user= userService.getDashBoardUser(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/service-providers")
    public ResponseEntity<List<ReturnServiceProvider>> sendNearestServiceProvider(@RequestParam String service){
        System.out.println(service);
        System.out.println("controller2: "+latitude+" "+longitude);
        List<ReturnServiceProvider> list= nearService.getNearestServiceProvider(service,latitude,longitude);
        if(list==null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        return ResponseEntity.ok(list);
    }
}
