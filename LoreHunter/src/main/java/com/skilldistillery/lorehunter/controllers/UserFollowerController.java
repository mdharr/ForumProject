package com.skilldistillery.lorehunter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.lorehunter.entities.UserFollower;
import com.skilldistillery.lorehunter.services.UserFollowerService;

@CrossOrigin({ "*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class UserFollowerController {
	
    @Autowired
    private UserFollowerService userFollowerService;

    @PostMapping("users/{followerId}/follow/{followedId}")
    public UserFollower followUser(@PathVariable int followerId, @PathVariable int followedId) {
        return userFollowerService.followUser(followerId, followedId);
    }

    @DeleteMapping("users/{followerId}/unfollow/{followedId}")
    public boolean unfollowUser(@PathVariable int followerId, @PathVariable int followedId) {
        return userFollowerService.unfollowUser(followerId, followedId);
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
