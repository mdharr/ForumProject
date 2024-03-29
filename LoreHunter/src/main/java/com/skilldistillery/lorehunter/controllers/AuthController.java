package com.skilldistillery.lorehunter.controllers;

import java.security.Principal;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.services.AuthService;
import com.skilldistillery.lorehunter.services.EmailService;
import com.skilldistillery.lorehunter.services.UserService;
import com.skilldistillery.lorehunter.enums.VerifiedStatus;

@RestController
@CrossOrigin({ "*", "http://localhost" })
public class AuthController {
	@Autowired
	private AuthService authService;

	@Autowired
	private UserService userService;

	@Autowired
	private SessionRegistry sessionRegistry;
	
	@Autowired
	private EmailService emailService;

	@PostMapping("register")
	public User register(@RequestBody User user, HttpServletResponse res) {
		if (user == null) {
			res.setStatus(400);
			return null;
		}
		user = authService.register(user);
		return user;
	}

//	Credentials needed in application.properties for username and password
//  Post Mapping for registering new user with email verification WIP!!
	
//	@PostMapping("register")
//	public User register(@RequestBody User user, HttpServletResponse res) {
//	    if (user == null) {
//	        res.setStatus(400);
//	        return null;
//	    }
//	    user.setVerificationCode(UUID.randomUUID().toString());
//	    user.setVerifiedStatus((VerifiedStatus.PENDING_VERIFICATION));;
//	    user = authService.register(user);
//	    // Send verification email to the registered email address
//	    emailService.sendVerificationEmail(user);
//	    return user;
//	}

	@GetMapping("authenticate")
	public User authenticate(Principal principal, HttpServletResponse res) {
		if (principal == null) { // no Authorization header sent
			res.setStatus(401);
			res.setHeader("WWW-Authenticate", "Basic");
			return null;
		}
		// update most recent login time
		User loggedInUser = authService.getUserByUsername(principal.getName());
		userService.updateLogInTime(loggedInUser);
		return loggedInUser;
	}

	@GetMapping("logged-in-users")
	public int getOnlineUsers() {
		return authService.getLoggedInUsers();
	}
	
	@PostMapping("login")
	public ResponseEntity<?> login(@RequestBody User user, HttpServletRequest request, HttpServletResponse response) {
	    // Extract the username and password from the login form
	    String username = user.getUsername();
	    String password = user.getPassword();

	    // Authenticate the user
	    User authenticatedUser = authService.authenticate(username, password);
	    if (authenticatedUser == null) {
	        // Return an error response if authentication fails
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
	    }

	    // Update most recent login time
	    userService.updateLogInTime(authenticatedUser);

	    // Create a new session for the authenticated user
	    HttpSession session = request.getSession(true);

	    // Set session attributes as needed
	    // For example, you can store the authenticated user object in the session
	    session.setAttribute("user", authenticatedUser);

	    // Return a success response to the frontend
	    return ResponseEntity.ok().body(authenticatedUser);
	}

	@PostMapping("logout")
	public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
	    // Get the current session
	    HttpSession session = request.getSession(false);

	    if (session != null) {
	        // Invalidate the session
	        session.invalidate();

	        // Clear authentication-related cookies from the client-side
	        Cookie[] cookies = request.getCookies();
	        if (cookies != null) {
	            for (Cookie cookie : cookies) {
	                // Assuming your authentication cookies have a specific name, such as "jsessionid"
	                if ("jsessionid".toUpperCase().equals(cookie.getName().toUpperCase())) {
	                    cookie.setValue("");
	                    cookie.setPath("/");
	                    cookie.setMaxAge(0);
	                    response.addCookie(cookie);
	                }
	                // Add any other authentication-related cookies here, if applicable
	            }
	        }
	    }

	    // Clear any session-related information from the response
	    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	    response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	    response.setHeader("Expires", "0"); // Proxies.

	    // Return a success response to the frontend
	    return ResponseEntity.ok().build();
	}
}