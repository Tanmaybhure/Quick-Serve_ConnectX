package com.project.projectService.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.projectService.DTO.ServiceResponseDTO;
import com.project.projectService.Model.mySQLModel.Customer;
import com.project.projectService.Repository.mySQL.customerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class NotificationService {
    private final SimpMessagingTemplate messagingTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Autowired
    private customerRepository cr;
    @Autowired
    public NotificationService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void sendToProvider(String providerEmail, String message, String customerEmail) {
        System.out.println("📤 Sending to: " + providerEmail);
        System.out.println("📩 Message: " + message);
        Customer customer= cr.getByEmail(customerEmail);
        // 🔥 Ensure the correct destination format
        try {
            Map<String, String> payload = new HashMap<>();
            payload.put("customerName", customer.getfName()+" "+customer.getlName()); // Adjust this to actual customer name
            payload.put("customerEmail",customer.getEmail());
            payload.put("message", message);
            String jsonPayload = objectMapper.writeValueAsString(payload);
            messagingTemplate.convertAndSendToUser(providerEmail, "/queue/notifications", jsonPayload);
            System.out.println("✅ Message Sent to /user/" + providerEmail + "/queue/notifications");
        } catch (Exception e) {
            System.err.println("❌ Error Sending Message: " + e.getMessage());
        }
    }
    public void sendToCustomer(ServiceResponseDTO serviceResponseDTO) {
        String email= serviceResponseDTO.getEmail();
        try {
            Map<String, String> payload = new HashMap<>();
            payload.put("receiverEmail", serviceResponseDTO.getEmail());
            payload.put("status", serviceResponseDTO.getStatus());
            payload.put("amount", serviceResponseDTO.getAmount());
            String json = objectMapper.writeValueAsString(payload);
            messagingTemplate.convertAndSendToUser(email, "/queue/service-response", json);
            System.out.println("✅ Message Sent to /user/" + email + "/queue/service-response");
        }catch (Exception e) {
            System.err.println("❌ Error Sending Message: " + e.getMessage());
        }
    }
    public void SendCustomerToProvider(ServiceResponseDTO serviceResponseDTO){
        try{
            Map<String, String> payload = new HashMap<>();
            payload.put("providerEmail", serviceResponseDTO.getEmail());
            payload.put("status", serviceResponseDTO.getStatus());
            String json = objectMapper.writeValueAsString(payload);
            messagingTemplate.convertAndSendToUser(serviceResponseDTO.getEmail(),"/queue/service-response",json);
            System.out.println("✅ Message Sent to /user/" + serviceResponseDTO.getEmail() + "/queue/service-response");
        }catch (Exception e){
            System.err.println("❌ Error Sending Message: " + e.getMessage());
        }
    }
}

