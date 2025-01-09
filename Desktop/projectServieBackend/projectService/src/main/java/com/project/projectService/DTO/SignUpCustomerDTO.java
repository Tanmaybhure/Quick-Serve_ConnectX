package com.project.projectService.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SignUpCustomerDTO {
    @JsonProperty("firstName")
    private String fName;
    @JsonProperty("lastName")
    private String lName;
    @JsonProperty("password")
    private String passWord;
    private String email;

    // Getters and Setters
    public String getfName() {
        return fName;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public String getlName() {
        return lName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }
}

