package com.skilldistillery.lorehunter.services;

import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.skilldistillery.lorehunter.entities.Game;

public interface GameService {
	
	List<Game> getAllGames();
	
	List<Game> getGamesBySearchTerm(String searchTerm);

	List<Game> getGamesFromExternalApi();

    Game createGame(Game game);
    
    Game getGameById(int gameId);
    
    Game updateGame(int gameId, Game updatedGame);
    
    void deleteGame(int gameId);

}
