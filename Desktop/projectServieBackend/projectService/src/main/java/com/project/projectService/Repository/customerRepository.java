package com.project.projectService.Repository;

import com.project.projectService.Model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface customerRepository extends JpaRepository<Customer,Long> {
}
