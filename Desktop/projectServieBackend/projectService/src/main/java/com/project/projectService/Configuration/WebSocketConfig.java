package com.project.projectService.Configuration;

import com.project.projectService.webSocket.UserHandshakeInterceptor;
import com.project.projectService.webSocket.WebSocketUserRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import java.util.Collections;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Autowired
    private WebSocketUserRegistry userRegistry;
    public WebSocketConfig() {
        System.out.println("WebSocketConfig initialized!");
    }
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .addInterceptors(new UserHandshakeInterceptor())
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        System.out.println("Configuring message broker...");
        registry.enableSimpleBroker("/queue","/user"); // Enable queue-based messaging for private notifications
        registry.setApplicationDestinationPrefixes("/app"); // Use "/app" for incoming messages from clients
        registry.setUserDestinationPrefix("/user"); // Allow user-specific destinations
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

                // ✅ Only process CONNECT messages
                if (accessor.getCommand() == StompCommand.CONNECT) {
                    String email = accessor.getFirstNativeHeader("user-email");
                    if (email != null) {
                        System.out.println("✅ Assigning Principal: " + email);

                        // Assign Principal
                        UsernamePasswordAuthenticationToken principal =
                                new UsernamePasswordAuthenticationToken(email, null, Collections.emptyList());
                        accessor.setUser(principal);

                        // Register user session
                        userRegistry.registerUser(accessor.getSessionId(), email);
                    } else {
                        System.out.println("🚨 No user-email found in headers! Using stored registry...");

                        // Try to retrieve stored session user
                        String sessionId = accessor.getSessionId();
                        String storedEmail = userRegistry.getUser(sessionId);

                        if (storedEmail != null) {
                            System.out.println("🔄 Retrieved email from registry: " + storedEmail);
                            accessor.setUser(new UsernamePasswordAuthenticationToken(storedEmail, null, Collections.emptyList()));
                        } else {
                            System.out.println("❌ Still no email available. Principal will be NULL!");
                        }
                    }

                }
                return message;
            }
        });
    }

}

