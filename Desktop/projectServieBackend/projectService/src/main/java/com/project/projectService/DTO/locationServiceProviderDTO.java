package com.project.projectService.DTO;

public class locationServiceProviderDTO {
    private String email;
    private String latitude;
    private String longitude;

    public String getLatitude() {
        return latitude;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }
}
