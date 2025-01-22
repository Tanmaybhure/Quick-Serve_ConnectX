package com.project.projectService.Repository.mySQL;

import com.project.projectService.Model.mySQLModel.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface customerRepository extends JpaRepository<Customer,Long> {
    Customer getByEmail(String email);
}
