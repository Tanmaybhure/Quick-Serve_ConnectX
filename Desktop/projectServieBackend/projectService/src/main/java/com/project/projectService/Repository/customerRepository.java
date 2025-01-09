package com.project.projectService.Repository;

import com.project.projectService.Model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.User;

import java.util.Optional;

public interface customerRepository extends JpaRepository<Customer,Long> {
    Customer getByEmail(String email);
}
