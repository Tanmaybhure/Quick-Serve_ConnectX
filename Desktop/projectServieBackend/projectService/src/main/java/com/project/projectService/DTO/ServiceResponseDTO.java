package com.project.projectService.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ServiceResponseDTO {
    @JsonProperty("receiverEmail")
    private String email;
    private String status;
    private String amount;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }
}
