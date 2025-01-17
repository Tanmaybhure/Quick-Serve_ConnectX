package com.project.projectService.Service;

import com.project.projectService.DTO.LoginRequest;
import com.project.projectService.DTO.SignUpRequest;
import com.project.projectService.Model.Customer;
import com.project.projectService.Repository.customerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    customerRepository repo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public Customer saveUser(SignUpRequest user){
        Customer newUser =new Customer();
        newUser.setEmail(user.getEmail());
        newUser.setfName(user.getfName());
        newUser.setlName(user.getlName());
        newUser.setPassWord(passwordEncoder.encode(user.getPassWord()));
        return repo.save(newUser);
    }

    public Customer login(LoginRequest loginRequest) {
        System.out.println("Attempting login with email: " + loginRequest.getEmail());
        Customer customer = repo.findByEmail(loginRequest.getEmail());
        if (customer != null) {
            System.out.println("User found, comparing passwords...");
            if (passwordEncoder.matches(loginRequest.getPassword(), customer.getPassWord())) {
                return customer;
            } else {
                System.out.println("Password mismatch");
            }
        } else {
            System.out.println("No user found with email: " + loginRequest.getEmail());
        }
        return null;
    }

    public Customer getUserByEmail(String email){
        return repo.findByEmail(email);  // This method must be defined in the repository

    }


}
