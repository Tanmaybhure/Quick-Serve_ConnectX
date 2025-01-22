package com.project.projectService.Repository.postgreSQL;

import com.project.projectService.Model.postSQLModel.locationServiceProvider;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceLocationPG extends JpaRepository<locationServiceProvider,Long> {
    locationServiceProvider getByEmail(String email);
}
