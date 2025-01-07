package com.project.projectService.DTO;

public class CustomerDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;

    // Constructor, getters, and setters
    public CustomerDTO(Long id, String firstName, String lastName, String email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public String getFullName() {
        return firstName + " " + lastName;
    }

    // Getters and setters
}
