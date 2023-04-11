package com.skilldistillery.lorehunter.security;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.session.SessionInformation;
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
        // Expire the session associated with the session ID
        SessionInformation sessionInformation = sessionRegistry.getSessionInformation(sessionId);
        if (sessionInformation != null) {
            sessionInformation.expireNow();
        }
        // Additional logout-related tasks, if any
        // For example, you can clear authentication-related cookies here
        
        // You can also perform other cleanup tasks, if needed
        // Call clearAuthenticationCookies to clear authentication-related cookies
        clearAuthenticationCookies(request, response);
        
        // Redirect to a specific page after logout, if desired
        // For example, you can redirect to a logout success page
        
        // Note: If you are using Spring Security's built-in logout functionality,
        // you can configure these tasks in the logoutSuccessHandler
    }
    
    private void clearAuthenticationCookies(HttpServletRequest request, HttpServletResponse response) {
    	  Cookie[] cookies = request.getCookies();
    	  if (cookies != null) {
    	    for (Cookie cookie : cookies) {
    	      if (cookie.getName().startsWith("auth")) {
    	        cookie.setMaxAge(0);
    	        cookie.setValue("");
    	        cookie.setPath("/");
    	        response.addCookie(cookie);
    	      }
    	    }
    	  }
    	}
}
