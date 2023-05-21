package com.skilldistillery.lorehunter.controllers;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.lorehunter.entities.Ticket;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.entities.UserFollower;
import com.skilldistillery.lorehunter.services.UserFollowerService;
import com.skilldistillery.lorehunter.services.UserService;

@CrossOrigin({ "*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class UserFollowerController {
	
    @Autowired
    private UserFollowerService userFollowerService;
    
    @Autowired
    private UserService userService;

    @PostMapping("users/{followerId}/follow/{followedId}")
    public ResponseEntity<UserFollower> followUser(Principal principal,
                                                    @PathVariable int followerId, @PathVariable int followedId) {
        String authenticatedUsername = principal.getName();
        User authenticatedUser = userService.showByUsername(authenticatedUsername);
        
        if (authenticatedUser != null) {
            if (authenticatedUser.getId() != followerId) {
    			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            
            UserFollower userFollower = userFollowerService.followUser(followerId, followedId);
            return new ResponseEntity<>(userFollower, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("users/{followerId}/unfollow/{followedId}")
    public ResponseEntity<Boolean> unfollowUser(Principal principal,
                                                 @PathVariable int followerId, @PathVariable int followedId) {
        String authenticatedUsername = principal.getName();
        User authenticatedUser = userService.showByUsername(authenticatedUsername);
        
        if (authenticatedUser != null) {
            if (authenticatedUser.getId() != followerId) {
    			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            
            boolean isUnfollowed = userFollowerService.unfollowUser(followerId, followedId);
            return new ResponseEntity<>(isUnfollowed, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Postman test success
    @GetMapping("users/{userId}/followers")
    public List<UserFollower> getFollowersByUserId(@PathVariable int userId) {
        return userFollowerService.getFollowersByUserId(userId);
    }

    // Postman test success
    @GetMapping("users/{userId}/followed")
    public List<UserFollower> getFollowedByUserId(@PathVariable int userId) {
        return userFollowerService.getFollowedByUserId(userId);
    }

}
