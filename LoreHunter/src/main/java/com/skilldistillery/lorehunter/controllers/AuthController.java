package com.skilldistillery.lorehunter.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.services.AuthService;
import com.skilldistillery.lorehunter.services.UserService;

@RestController
@CrossOrigin({ "*", "http://localhost" })
public class AuthController {
	@Autowired
	private AuthService authService;

	@Autowired
	private UserService userService;

	@Autowired
	private SessionRegistry sessionRegistry;

	@PostMapping("register")
	public User register(@RequestBody User user, HttpServletResponse res) {
		if (user == null) {
			res.setStatus(400);
			return null;
		}
		user = authService.register(user);
		return user;
	}

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

	@PostMapping("logout")
	public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
		// Get the current session
		HttpSession session = request.getSession(false);

		if (session != null) {
			// Invalidate the session
			session.invalidate();
		}

		// Clear any session-related information from the response
		response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
		response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
		response.setHeader("Expires", "0"); // Proxies.

		// Return a success response to the frontend
		return ResponseEntity.ok().build();
	}
}