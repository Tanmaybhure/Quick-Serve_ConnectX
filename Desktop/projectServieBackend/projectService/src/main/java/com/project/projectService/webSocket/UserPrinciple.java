package com.project.projectService.webSocket;

import java.security.Principal;

public class UserPrinciple implements Principal {
    private String name;

    public UserPrinciple(String name) {
        this.name = name;
    }

    @Override
    public String getName() {
        return name;
    }
}
