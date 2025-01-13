package com.project.projectService.Controller;

import com.project.projectService.DTO.*;
import com.project.projectService.Model.Customer;
import com.project.projectService.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RequestMapping("/api")
@RestController
public class LoginController {

    @Autowired
    private UserService userService;

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        System.out.println("Login attempt with email: " + email + " and password: " + password);

        // Fetch the customer by email
        Customer customer = userService.getUserByEmail(email);

        if (customer != null && customer.getPassWord().equals(password)) {
            // Login successful
            session.setAttribute("username", customer.getEmail());
            session.setAttribute("customerId", customer.getId());

            // Debugging: Check if username is set in session
            System.out.println("Session attributes after login:");
            System.out.println("Username from session: " + session.getAttribute("username"));
            System.out.println("Customer ID from session: " + session.getAttribute("customerId"));

            return ResponseEntity.ok(new CustomerDTO(customer.getId(), customer.getfName(), customer.getlName(), customer.getEmail()));
        } else {
            // Invalid login credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse("Invalid email or password"));
        }
    }

    @GetMapping("/session-check")
    public ResponseEntity<Map<String, Object>> sessionCheck(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        String username = (String) session.getAttribute("username");

        if (username != null) {
            response.put("loggedIn", true);
            response.put("username", username);
        } else {
            response.put("loggedIn", false);
        }

        return ResponseEntity.ok(response);
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
