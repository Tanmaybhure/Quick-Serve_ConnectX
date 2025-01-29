package com.project.projectService.Service;

import com.project.projectService.Model.NormalModel.ReturnServiceProvider;
import com.project.projectService.Model.mySQLModel.ServiceProvider;
import com.project.projectService.Model.postSQLModel.locationServiceProvider;
import com.project.projectService.Repository.mySQL.customerRepository;
import com.project.projectService.Repository.mySQL.serviceProviderRepository;
import com.project.projectService.Repository.postgreSQL.ServiceLocationPG;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class NearestProviderService {
    @Autowired
    customerRepository repo;
    @Autowired
    serviceProviderRepository Servicerepo;
    @Autowired
    ServiceLocationPG servicePg;

    double lat1;
    double lon1;
    private double calculateDistance(double lat2, double lon2){
        final int R = 6371; // Radius of the Earth in kilometers
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    public List<ReturnServiceProvider> getNearestServiceProvider(String service, String latitude, String longitude){
        List<locationServiceProvider> allSpList= servicePg.findAll();
        List<ReturnServiceProvider> nearestProvider= new ArrayList<>();
        lat1=Double.parseDouble(latitude);
        lon1=Double.parseDouble(longitude);
//        System.out.println(lat1+" "+lon1+" "+service);
        for(locationServiceProvider obj: allSpList){
            double lat2= Double.parseDouble(obj.getLatitude());
            double lon2= Double.parseDouble(obj.getLongitude());
            double distance= calculateDistance(lat2,lon2);
            if(distance<=Double.MAX_VALUE){
                String currEmail= obj.getEmail();
//                System.out.println(distance+"     "+currEmail);
                ServiceProvider newObj= Servicerepo.findByEmail(currEmail);
                ReturnServiceProvider newTobeAdd= new ReturnServiceProvider();
                newTobeAdd.setId(newObj.getId());
                newTobeAdd.setService(newObj.getService());
                newTobeAdd.setEmail(newObj.getEmail());
                newTobeAdd.setFname(newObj.getFname());
                newTobeAdd.setLname(newObj.getLname());
                newTobeAdd.setLatitude(lat2+"");
                newTobeAdd.setLongitude(lon2+"");
                newTobeAdd.setPassword("**");
                newTobeAdd.setDistance(Math.ceil(distance)+"");
//                System.out.println(distance+"     "+newObj.getFname()+" "+newObj.getLname()+" "+newObj.getFname()+" "+newObj.getService());
                nearestProvider.add(newTobeAdd);
            }
        }
//        for(ReturnServiceProvider s: nearestProvider) System.out.println(s.getFname()+" "+s.getLname()+" "+s.getService());
////        nearestProvider.sort(Comparator.comparingInt(a -> Integer.parseInt(a.getDistance())));
        return nearestProvider;
    }
}
