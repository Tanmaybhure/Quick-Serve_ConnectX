package com.project.projectService.Controller;

import com.project.projectService.DTO.*;
import com.project.projectService.Jwt.JwtService;
import com.project.projectService.Model.Customer;
import com.project.projectService.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RequestMapping("/api")
@RestController
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManagerBuilder authenticationManagerBuilder;

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        Customer customer = userService.login(loginRequest);
        if (customer != null) {
            String token = jwtService.generateAccessToken(customer.getEmail());
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Invalid email or password");
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
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
