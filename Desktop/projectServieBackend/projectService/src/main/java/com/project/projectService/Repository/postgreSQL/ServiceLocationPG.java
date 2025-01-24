package com.project.projectService.Repository.postgreSQL;

import com.project.projectService.Model.postSQLModel.locationServiceProvider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceLocationPG extends JpaRepository<locationServiceProvider,Long> {
    locationServiceProvider getByEmail(String email);

}
