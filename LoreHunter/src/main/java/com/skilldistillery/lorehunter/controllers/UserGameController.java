package com.skilldistillery.lorehunter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.entities.UserGame;
import com.skilldistillery.lorehunter.repositories.UserGameRepository;
import com.skilldistillery.lorehunter.services.UserGameService;
import com.skilldistillery.lorehunter.services.UserService;

@CrossOrigin({ "*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class UserGameController {
	
	@Autowired
	private UserGameService userGameService;
	
	@Autowired
	private UserGameRepository userGameRepo;
	
	@Autowired
	private UserService userService;
	
    @PostMapping("user/{uid}/usergames")
    public ResponseEntity<UserGame> createUserGame(@RequestBody UserGame userGame) {
        UserGame newUserGame = userGameService.createUserGame(userGame);
        if (newUserGame != null) {
            return new ResponseEntity<>(newUserGame, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("user/{uid}/usergames/{gid}")
    public ResponseEntity<UserGame> getUserGameById(@PathVariable int userId, @PathVariable int gameId) {
        UserGame userGame = userGameService.getUserGameById(userId, gameId);
        if (userGame != null) {
            return new ResponseEntity<>(userGame, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    @GetMapping("user/{uid}/usergames")
    public ResponseEntity<List<UserGame>> indexUserGames(@PathVariable int userId) {
    	User user = userService.show(userId);
    	if (user != null) {
    		return new ResponseEntity<>(userGameRepo.findByUserId(userId), HttpStatus.OK);
    	} else {
    		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    	}
    }

    @PutMapping("user/{uid}/usergames/{gid}")
    public ResponseEntity<UserGame> updateUserGame(@PathVariable int userId, @PathVariable int gameId, @RequestBody UserGame userGame) {
        UserGame updatedUserGame = userGameService.updateUserGame(userId, gameId, userGame);
        if (updatedUserGame != null) {
            return new ResponseEntity<>(updatedUserGame, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("user/{uid}/usergames/{gid}")
    public ResponseEntity<Void> deleteUserGame(@PathVariable int userId, @PathVariable int gameId) {
        userGameService.deleteUserGame(userId, gameId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
