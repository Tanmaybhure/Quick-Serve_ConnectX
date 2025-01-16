package com.project.projectService.Service;

import com.project.projectService.DTO.LoginRequest;
import com.project.projectService.DTO.SignUpRequest;
import com.project.projectService.Model.Customer;
import com.project.projectService.Repository.customerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    customerRepository repo;
    public Customer saveUser(SignUpRequest user){
        Customer newUser =new Customer();
        newUser.setEmail(user.getEmail());
        newUser.setfName(user.getfName());
        newUser.setlName(user.getlName());
        newUser.setPassWord(user.getPassWord());
        return repo.save(newUser);
    }

    public Customer login(LoginRequest user){
        return repo.findByEmailAndPassWord(user.getEmail(), user.getPassword());
    }
    public Customer getUserByEmail(String email){
        return repo.findByEmail(email);  // This method must be defined in the repository

    }


}
