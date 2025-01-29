package com.project.projectService.webSocket;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class WebSocketUserRegistry {
    private final Map<String, String> sessionIdToUser = new ConcurrentHashMap<>();

    public void registerUser(String sessionId, String email) {
        sessionIdToUser.put(sessionId, email);
        System.out.println("✅ User Registered: " + email + " for session " + sessionId);
    }

    public String getUser(String sessionId) {
        return sessionIdToUser.get(sessionId);
    }

    public void removeUser(String sessionId) {
        sessionIdToUser.remove(sessionId);
        System.out.println("❌ User Removed for session " + sessionId);
    }
}

