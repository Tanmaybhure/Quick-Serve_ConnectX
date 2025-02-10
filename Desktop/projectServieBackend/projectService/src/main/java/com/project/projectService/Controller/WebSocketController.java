package com.project.projectService.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.projectService.DTO.MessageRequestDTO;
import com.project.projectService.DTO.ServiceResponseDTO;
import com.project.projectService.Service.NotificationService;
import com.project.projectService.webSocket.WebSocketUserRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Collections;

@RestController
public class WebSocketController {
    @Autowired
    private WebSocketUserRegistry userRegistry;
    private final NotificationService notificationService;

    @Autowired
    public WebSocketController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @MessageMapping("/send-message")
    public void sendMessageResponse(@Payload MessageRequestDTO request, Message<?> message) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        // 🔥 Retrieve Principal from Session
        Principal principal = accessor.getUser();

        System.out.println("🔴 Received STOMP Message!");
        System.out.println("🛠 Provider Email: " + request.getProviderEmail());
        System.out.println("🛠 Message: " + request.getMessage());
        String customerEmail="";
        if (principal == null) {
            System.out.println("🚨 Principal is NULL! Attempting manual lookup...");

            // 🔥 Try to retrieve it from session registry
            String sessionId = accessor.getSessionId();
            customerEmail = userRegistry.getUser(sessionId);

            if (customerEmail != null) {
                System.out.println("✅ Customer Email Retrieved from Registry: " + customerEmail);
                principal = new UsernamePasswordAuthenticationToken(customerEmail, null, Collections.emptyList());
            } else {
                System.out.println("❌ Still No Principal Found!");
            }
        }

        if (principal != null) {
            System.out.println("✅ Final Principal: " + principal.getName());
            notificationService.sendToProvider(request.getProviderEmail(), request.getMessage(), customerEmail);
        } else {
            System.out.println("❌ Cannot Send Message: No Principal Found!");
        }
    }
    @MessageMapping("/service-response")
    public void sendAcceptResponse(@Payload ServiceResponseDTO serviceResponseDTO){
        notificationService.sendToCustomer(serviceResponseDTO);
    }

    @MessageMapping("/customer-response")
    public void sendAgainResponse(@Payload ServiceResponseDTO serviceResponseDTO){
        notificationService.SendCustomerToProvider(serviceResponseDTO);
    }
}


