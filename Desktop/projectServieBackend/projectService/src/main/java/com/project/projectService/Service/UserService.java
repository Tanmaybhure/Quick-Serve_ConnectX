package com.project.projectService.Service;

import com.project.projectService.DTO.LoginRequest;
import com.project.projectService.DTO.SignUpCustomerDTO;
import com.project.projectService.DTO.SignUpServiceProviderDTO;
import com.project.projectService.DTO.locationServiceProviderDTO;
import com.project.projectService.Model.mySQLModel.Customer;
import com.project.projectService.Model.mySQLModel.ServiceProvider;
import com.project.projectService.Model.postSQLModel.locationServiceProvider;
import com.project.projectService.Repository.mySQL.customerRepository;
import com.project.projectService.Repository.mySQL.serviceProviderRepository;
import com.project.projectService.Repository.postgreSQL.ServiceLocationPG;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final PasswordEncoder passwordEncoder= new BCryptPasswordEncoder();
    @Autowired
    customerRepository repo;
    @Autowired
    serviceProviderRepository Servicerepo;
    @Autowired
    ServiceLocationPG servicePg;

    public Customer saveUser(SignUpCustomerDTO user){
        Customer newUser =new Customer();
        newUser.setEmail(user.getEmail());
        newUser.setfName(user.getfName());
        newUser.setlName(user.getlName());
        newUser.setPassWord(passwordEncoder.encode(user.getPassWord()));
        return repo.save(newUser);
    }
    public ServiceProvider saveServiceProvider(SignUpServiceProviderDTO user){
        ServiceProvider newUser =new ServiceProvider();
        newUser.setEmail(user.getEmail());
        newUser.setFname(user.getFirstName());
        newUser.setLname(user.getLastName());
        newUser.setService(user.getServiceType());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        return Servicerepo.save(newUser);
    }
    public Customer authCheckService(LoginRequest user){
        Customer newuser = repo.getByEmail(user.getEmail());
        if(newuser==null) return null;
        String password= newuser.getPassWord();
        boolean flag= passwordEncoder.matches(user.getPassword(), password);
        return (flag)? newuser: null;
    }
    public ServiceProvider authCheckServiceProvider(LoginRequest user){
        ServiceProvider newUser= Servicerepo.findByEmail(user.getEmail());
        if(newUser==null) return null;
        String password= newUser.getPassword();
        boolean flag = passwordEncoder.matches(user.getPassword(),password);
        return (flag)? newUser: null;
    }

    public locationServiceProvider saveLocationPg(locationServiceProviderDTO location){
        locationServiceProvider newlocation = new locationServiceProvider();
        newlocation.setEmail(location.getEmail());
        newlocation.setLatitude(location.getLatitude());
        newlocation.setLongitude(location.getLongitude());
        return servicePg.save(newlocation);
    }
}
