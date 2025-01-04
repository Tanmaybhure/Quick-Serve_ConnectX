package com.project.projectService.Service;

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
}
