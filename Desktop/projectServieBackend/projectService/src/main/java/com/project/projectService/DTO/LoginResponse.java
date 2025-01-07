package com.project.projectService.DTO;

import com.project.projectService.Model.Customer;

public class LoginResponse {
    private String message;
    private Customer customer;

    public LoginResponse(String message) {
        this.message = message;
    }

    public LoginResponse(String message, Customer customer) {
        this.message = message;
        this.customer = customer;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}
