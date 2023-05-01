package com.skilldistillery.lorehunter.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.skilldistillery.lorehunter.entities.Comment;
import com.skilldistillery.lorehunter.entities.Like;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.repositories.LikeRepository;
import com.skilldistillery.lorehunter.repositories.UserRepository;

@Service
public class LikeServiceImpl implements LikeService {
	
	@Autowired
	private LikeRepository likeRepo;
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public Like createLike(Comment comment, String username) {
	    // Retrieve the user from the database using the username
	    User user = userRepo.findByUsername(username);
	    if (user == null) {
	        // Handle the case where the user is not found
	        return null;
	    }

	    Like like = new Like();
	    like.setComment(comment);
	    like.setUser(user);
	    return likeRepo.save(like);
	}


	@Override
	public ResponseEntity<?> deleteLike(int likeId) {
	    // Retrieve the like from the database using likeId
	    Optional<Like> likeOptional = likeRepo.findById(likeId);
	    if (likeOptional.isPresent()) {
	        Like like = likeOptional.get();
	        likeRepo.delete(like);
	        return ResponseEntity.ok().build();
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}

	@Override
    public int getLikeCount(Comment comment) {
        return likeRepo.countByComment(comment);
    }

	@Override
	public boolean hasUserLikedComment(String username, Comment comment) {
	    User user = userRepo.findByUsername(username);
	    return likeRepo.existsByUserAndComment(user, comment);
	}


}
