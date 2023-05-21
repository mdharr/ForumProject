package com.skilldistillery.lorehunter.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.entities.UserFollower;
import com.skilldistillery.lorehunter.entities.UserFollowerId;
import com.skilldistillery.lorehunter.repositories.UserFollowerRepository;
import com.skilldistillery.lorehunter.repositories.UserRepository;

@Service
public class UserFollowerServiceImpl implements UserFollowerService {
	
    @Autowired
    private UserFollowerRepository userFollowerRepo;
    
    @Autowired
    private UserRepository userRepo;

    @Override
    public UserFollower followUser(int followerId, int followedId) {
        // Logic for following a user
        // Fetch the follower and followed users from the repository
        User follower = userRepo.findById(followerId).orElse(null);
        User followed = userRepo.findById(followedId).orElse(null);
        if (follower == null || followed == null) {
            // Handle the case when either user is not found
            return null;
        }
        
        // Create a new UserFollower entity and set the follower and followed users
        UserFollower userFollower = new UserFollower();
        userFollower.setFollower(follower);
        userFollower.setFollowed(followed);
        
        // Save the UserFollower entity to the repository
        return userFollowerRepo.save(userFollower);
    }

    @Override
    public boolean unfollowUser(int followerId, int followedId) {
        // Logic for unfollowing a user
        // Find the UserFollower entity by followerId and followedId
        UserFollowerId userFollowerId = new UserFollowerId(followerId, followedId);
        UserFollower userFollower = userFollowerRepo.findById(userFollowerId).orElse(null);
        if (userFollower != null) {
            // Delete the UserFollower entity
            userFollowerRepo.delete(userFollower);
            return true;
        }
        return false;
    }

    @Override
    public List<UserFollower> getFollowersByUserId(int userId) {
        // Logic for retrieving followers by userId
        // Use the repository to find all UserFollowers where the followedId matches the userId
        return userFollowerRepo.findAllByFollowed_Id(userId);
    }

    @Override
    public List<UserFollower> getFollowedByUserId(int userId) {
        // Logic for retrieving followed users by userId
        // Use the repository to find all UserFollowers where the followerId matches the userId
        return userFollowerRepo.findAllByFollower_Id(userId);
    }

}
