package com.skilldistillery.lorehunter.services;

import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.skilldistillery.lorehunter.entities.Game;

public interface GameService {
	
	List<Game> getAllGames();
	
	List<Game> getGamesBySearchTerm(String searchTerm);

	void storeGameUrl(int userId, int gameId, String gameUrl);

	List<Game> getGamesFromExternalApi();

	void saveGame(JsonNode jsonNode);

	Game getGame(int gameId);

//	Game createGameFromApi(Game game);

}
