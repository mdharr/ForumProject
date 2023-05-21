package com.skilldistillery.lorehunter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.lorehunter.entities.UserFollower;
import com.skilldistillery.lorehunter.entities.UserFollowerId;

public interface UserFollowerRepository extends JpaRepository<UserFollower, UserFollowerId> {

}
