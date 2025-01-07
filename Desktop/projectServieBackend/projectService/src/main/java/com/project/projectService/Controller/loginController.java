package com.project.projectService.Controller;

import com.project.projectService.DTO.*;
import com.project.projectService.Model.Customer;
import com.project.projectService.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api")
@RestController
public class loginController {

    @Autowired
    private UserService userService;

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        System.out.println("Login attempt with email: " + email + " and password: " + password);

        // Fetch the customer by email
        Customer customer = userService.getUserByEmail(email);

        if (customer != null && customer.getPassWord().equals(password)) {
            // Login successful
            return ResponseEntity.ok(new CustomerDTO(customer.getId(), customer.getfName(), customer.getlName(), customer.getEmail()));
        } else {
            // Invalid login credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse("Invalid email or password"));
        }
    }

    // Signup endpoint
    @PostMapping("/signup")
    public ResponseEntity<Boolean> signup(@RequestBody SignUpRequest signUpRequest) {
        System.out.println("Sign Up attempt: " + signUpRequest.toString());
        boolean result = userService.saveUser(signUpRequest) != null;
        return new ResponseEntity<>(result, result ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST);
    }

    // Service provider location endpoint
    @PostMapping("/service-provider-location")
    public ResponseEntity<Boolean> saveServiceProviderLocation(@RequestBody locationServiceProviderDTO location) {
        String latitude = location.getLatitude();
        String longitude = location.getLongitude();
        System.out.println("Latitude: " + latitude + ", Longitude: " + longitude);

        boolean isSaved = (latitude != null && longitude != null);
        return new ResponseEntity<>(isSaved ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
}
