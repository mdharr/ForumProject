package com.skilldistillery.lorehunter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.lorehunter.entities.UserFollower;
import com.skilldistillery.lorehunter.entities.UserFollowerId;

public interface UserFollowerRepository extends JpaRepository<UserFollower, UserFollowerId> {

	List<UserFollower> findAllByFollowed_Id(int userId);
	
	List<UserFollower> findAllByFollower_Id(int userId);
}
