package com.project.projectService.Repository;

import com.project.projectService.Model.ServiceProvider;
import org.springframework.data.jpa.repository.JpaRepository;

public interface serviceProviderRepository extends JpaRepository<ServiceProvider,Long> {
    ServiceProvider findByEmail(String email);
}
