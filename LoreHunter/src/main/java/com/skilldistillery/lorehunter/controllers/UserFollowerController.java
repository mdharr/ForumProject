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

    // Postman test success
    @PostMapping("users/{followerId}/follow/{followedId}")
    public ResponseEntity<UserFollower> followUser(Principal principal,
                                                    @PathVariable int followerId, @PathVariable int followedId) {
        if (principal == null) {
            // Handle the case when the user is not authenticated
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String authenticatedUsername = principal.getName();
        User authenticatedUser = userService.showByUsername(authenticatedUsername);

        // Check if the authenticated user is the follower
        if (authenticatedUser != null && authenticatedUser.getId() == followerId) {
            User followedUser = userService.getUser(followedId);

            // Check if the followed user exists
            if (followedUser != null) {
                // Perform authentication and authorization checks on the followed user
                // For example, you can check if the followed user allows being followed by the authenticated user

                // Since you want to ignore authentication for the followed user, you can skip the authentication and authorization checks

                // If the authentication and authorization checks pass, proceed with the follow action
                UserFollower userFollower = userFollowerService.followUser(followerId, followedId);
                if (userFollower != null) {
                    return new ResponseEntity<>(userFollower, HttpStatus.OK);
                } else {
                    // Handle the case where userFollower is null (follow action failed)
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            } else {
                // Handle the case where followedUser is null (followed user not found)
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    // Postman test success
    @DeleteMapping("users/{followerId}/unfollow/{followedId}")
    public ResponseEntity<Boolean> unfollowUser(Principal principal,
                                                 @PathVariable int followerId, @PathVariable int followedId) {
        if (principal == null) {
            // Handle the case when the user is not authenticated
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String authenticatedUsername = principal.getName();
        User authenticatedUser = userService.showByUsername(authenticatedUsername);

        // Check if the authenticated user is the follower
        if (authenticatedUser != null && authenticatedUser.getId() == followerId) {
            User followedUser = userService.getUser(followedId);

            // Check if the followed user exists
            if (followedUser != null) {
                // Perform authentication and authorization checks on the followed user
                // For example, you can check if the followed user allows being unfollowed by the authenticated user

                // Since you want to ignore authentication for the followed user, you can skip the authentication and authorization checks

                // If the authentication and authorization checks pass, proceed with the unfollow action
                boolean isUnfollowed = userFollowerService.unfollowUser(followerId, followedId);
                return new ResponseEntity<>(isUnfollowed, HttpStatus.OK);
            } else {
                // Handle the case where followedUser is null (followed user not found)
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }




    // Postman test success
    @GetMapping("users/{userId}/followers")
    public List<UserFollower> getFollowersByUserId(@PathVariable int userId) {
        return userFollowerService.getFollowersByUserId(userId);
    }

    // Postman test success
    @GetMapping("users/{userId}/following")
    public List<UserFollower> getFollowingByUserId(@PathVariable int userId) {
        return userFollowerService.getFollowedByUserId(userId);
    }

}
