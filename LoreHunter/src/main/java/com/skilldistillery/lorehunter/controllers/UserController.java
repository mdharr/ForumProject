package com.skilldistillery.lorehunter.controllers;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.lorehunter.entities.Game;
import com.skilldistillery.lorehunter.entities.Ticket;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.repositories.GameRepository;
import com.skilldistillery.lorehunter.repositories.UserRepository;
import com.skilldistillery.lorehunter.services.GameService;
import com.skilldistillery.lorehunter.services.UserService;

@CrossOrigin({ "*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRepository userRepo;
	
	
	@GetMapping("users")
	public List<User> index() {
		return userService.index();
	}
	
	@GetMapping("users/{id}")
	public User getUser(@PathVariable("id") int id, HttpServletResponse res) {
		
		if(userService.getUser(id) == null) {
			res.setStatus(404);
		}
		return userService.getUser(id);
	}
	
	@GetMapping("users/username/{username}")
	public User show(Principal principal, @PathVariable String username, HttpServletRequest req, HttpServletResponse res) {
		User user = userService.showByUsername(username);
		if(user == null) {
			res.setStatus(404);
		}
		return user;
	}
	
	@PostMapping("users")
	public User register(@RequestBody User user, HttpServletResponse res, HttpServletRequest req) {
		
		try {
			userService.register(user);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(user.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(404);
		}
		return user;
	}
	
	@PutMapping("users/")
	public User userUpdate(Principal principal, @RequestBody User user, HttpServletResponse res) {
		try {
			user = userService.updateOwn(principal.getName(), user);
			
			if(user == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			user = null;
		}
		return user;
	}
	
	@PutMapping("users/{uid}/update")
	public ResponseEntity<User> updateUser(@PathVariable("uid") int id, @RequestBody User user, Principal principal) {
		Optional<User> optUser = userRepo.findById(id);
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		User authenticatedUser = userService.showByUsername(username);
		if (optUser.isPresent()) {
			User existingUser = optUser.get();
			if (!authenticatedUser.getRole().equals("ADMIN")) {
				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
			}
			
			if (user.getUsername() != null) {
	            existingUser.setUsername(user.getUsername());
	        }
	        if (user.getEnabled() != null) {
	            existingUser.setEnabled(user.getEnabled());
	        }
	        if (user.getRole() != null) {
	            existingUser.setRole(user.getRole());
	        }
	        if (user.getFirstName() != null) {
	            existingUser.setFirstName(user.getFirstName());
	        }
	        if (user.getLastName() != null) {
	            existingUser.setLastName(user.getLastName());
	        }
	        if (user.getEmail() != null) {
	            existingUser.setEmail(user.getEmail());
	        }
	        if (user.getImageUrl() != null) {
	            existingUser.setImageUrl(user.getImageUrl());
	        }
	        if (user.getStatus() != null) {
	            existingUser.setStatus(user.getStatus());
	        }
	        if (user.getBannerMessage() != null) {
	            existingUser.setBannerMessage(user.getBannerMessage());
	        }
	        if (user.getBannerImage() != null) {
	            existingUser.setBannerImage(user.getBannerImage());
	        }
			
			User updatedUser = userService.updateAdmin(id, existingUser);
			
			if (updatedUser == null) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			} else {
				return new ResponseEntity<>(updatedUser, HttpStatus.OK);
			}
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
		
	@PatchMapping("users/{id}")
	public void archiveUser(Principal principal, @PathVariable int id, HttpServletResponse res) {
		try {
			if (userService.archiveUser(id)) {
				res.setStatus(204);
			} else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
	}
	
    @PutMapping("users/{id}/setOnline")
    public ResponseEntity<?> setUserOnline(@PathVariable("id") int userId) {
        try {
            User user = userService.getUser(userId);
            if (user == null) {
                return ResponseEntity.notFound().build();
            }
            user.setIsOnline(true);
            userRepo.save(user);
            return ResponseEntity.ok().body("User is now online");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Endpoint to set user's isOnline status to false
    @PutMapping("users/{id}/setOffline")
    public ResponseEntity<?> setUserOffline(@PathVariable("id") int userId) {
        try {
            User user = userService.getUser(userId);
            if (user == null) {
                return ResponseEntity.notFound().build();
            }
            user.setIsOnline(false);
            userRepo.save(user);
            return ResponseEntity.ok().body("User is now offline");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
	
	@GetMapping("userCounts")
	public ResponseEntity<UserCountResponse> getUserCounts() {
	    int loggedInUsersCount = userService.getLoggedInUsersCount();
	    int notLoggedInUsersCount = userService.getNotLoggedInUsersCount();

	    UserCountResponse response = new UserCountResponse(loggedInUsersCount, notLoggedInUsersCount);
	    return ResponseEntity.ok(response);
	}

	// Define a response class to encapsulate the user count data
	static class UserCountResponse {
	    private int loggedInUsersCount;
	    private int notLoggedInUsersCount;

	    public UserCountResponse() {
	        // Constructor
	    }

	    public UserCountResponse(int loggedInUsersCount, int notLoggedInUsersCount) {
	        this.loggedInUsersCount = loggedInUsersCount;
	        this.notLoggedInUsersCount = notLoggedInUsersCount;
	    }

	    public int getLoggedInUsersCount() {
	        return loggedInUsersCount;
	    }

	    public void setLoggedInUsersCount(int loggedInUsersCount) {
	        this.loggedInUsersCount = loggedInUsersCount;
	    }

	    public int getNotLoggedInUsersCount() {
	        return notLoggedInUsersCount;
	    }

	    public void setNotLoggedInUsersCount(int notLoggedInUsersCount) {
	        this.notLoggedInUsersCount = notLoggedInUsersCount;
	    }
	}

}
