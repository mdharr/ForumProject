package com.skilldistillery.lorehunter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.lorehunter.entities.Like;

public interface LikeRepository extends JpaRepository<Like, Integer> {

}
