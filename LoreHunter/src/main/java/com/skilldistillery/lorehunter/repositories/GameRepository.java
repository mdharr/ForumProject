package com.skilldistillery.lorehunter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.lorehunter.entities.Game;

public interface GameRepository extends JpaRepository<Game, Integer> {
		
}
