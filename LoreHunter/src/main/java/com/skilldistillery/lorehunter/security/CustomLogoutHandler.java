package com.skilldistillery.lorehunter.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

@Lazy
@Component
public class CustomLogoutHandler implements LogoutHandler {
	
	@Lazy
    @Autowired
    private SessionRegistry sessionRegistry;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        // Get the user's session ID
        String sessionId = request.getSession().getId();
        // Remove the session from the SessionRegistry
        sessionRegistry.removeSessionInformation(sessionId);
    }
}
