package com.skilldistillery.lorehunter.services;

import java.util.List;

import com.skilldistillery.lorehunter.entities.UserFollower;

public interface UserFollowerService {
	
    UserFollower followUser(int followerId, int followedId);
    boolean unfollowUser(int followerId, int followedId);
    List<UserFollower> getFollowersByUserId(int userId);
    List<UserFollower> getFollowedByUserId(int userId);

}
