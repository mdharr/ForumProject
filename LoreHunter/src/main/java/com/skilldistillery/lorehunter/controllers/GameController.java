package com.skilldistillery.lorehunter.controllers;

import java.security.Principal;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.lorehunter.entities.Game;
import com.skilldistillery.lorehunter.repositories.GameRepository;
import com.skilldistillery.lorehunter.services.GameService;

@CrossOrigin({ "*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class GameController {
	
	@Autowired
	private GameService gameService;
	
	@Autowired
	private GameRepository gameRepo;
	
    // store url for user in game table of database
    @PostMapping("users/{userId}/games/{gameId}/url")
    public ResponseEntity<String> storeGameUrlForUser(
            @PathVariable("userId") int userId,
            @PathVariable("gameId") int gameId,
            @RequestBody String gameUrl) {

        gameService.storeGameUrl(userId, gameId, gameUrl);

        return ResponseEntity.ok("Game URL stored successfully");
    }

}
