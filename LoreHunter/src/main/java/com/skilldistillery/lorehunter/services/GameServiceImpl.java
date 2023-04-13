package com.skilldistillery.lorehunter.services;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.skilldistillery.lorehunter.entities.Game;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.entities.UserGame;

@Service
public class GameServiceImpl implements GameService {
	
	private static final String API_BASE_URL = "https://api.rawg.io/api/games/";
	private static final String API_KEY_PARAM = "key";
	private static final String API_KEY_VALUE = "a569b5c91c944880a78145c9280ce92c";

	@Override
	public List<Game> getAllGames() {
		String url = API_BASE_URL + "?" + API_KEY_PARAM + "=" + API_KEY_VALUE;
        // Perform HTTP GET request to fetch games from external API using a HTTP client (e.g., RestTemplate or HttpClient)
        // Parse the response and map it to Game objects
        // Return the list of Game objects
        // Example:
        // List<Game> games = restTemplate.getForObject(url, Game[].class);
        // return games != null ? Arrays.asList(games) : Collections.emptyList();
        // Please note that the exact implementation details may vary depending on the HTTP client and serialization library you choose to use
        return Collections.emptyList(); // Placeholder implementation
	}

}
