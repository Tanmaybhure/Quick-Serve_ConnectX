package com.project.projectService.Repository.mySQL;

import com.project.projectService.Model.mySQLModel.ServiceProvider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface serviceProviderRepository extends JpaRepository<ServiceProvider,Long> {
    ServiceProvider findByEmail(String email);
    List<ServiceProvider> findAllByService(String service);
}
