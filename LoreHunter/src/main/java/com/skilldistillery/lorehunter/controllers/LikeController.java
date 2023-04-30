package com.skilldistillery.lorehunter.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.lorehunter.entities.Comment;
import com.skilldistillery.lorehunter.entities.Like;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.repositories.CommentRepository;
import com.skilldistillery.lorehunter.repositories.LikeRepository;
import com.skilldistillery.lorehunter.repositories.UserRepository;
import com.skilldistillery.lorehunter.services.LikeService;

@CrossOrigin({ "*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class LikeController {
	
	@Autowired
	private CommentRepository commentRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private LikeService likeService;
	
	@Autowired
	private LikeRepository likeRepo;
	
	@PostMapping("comments/{commentId}/likes")
	public ResponseEntity<?> createLike(
		    @PathVariable int commentId,
		    @RequestBody User user) {
	    // Retrieve the comment from the database using commentId
	    Optional<Comment> commentOptional = commentRepo.findById(commentId);
	    if (!commentOptional.isPresent()) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	    }
	    Comment comment = commentOptional.get();

	    // Retrieve the user from the database using user ID or any authentication mechanism
	    Optional<User> userOptional = userRepo.findById(user.getId());
	    if (!userOptional.isPresent()) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	    }
	    User authenticatedUser = userOptional.get();

	    // Invoke the likeService.createLike() method to create a like
	    Like like = likeService.createLike(comment, authenticatedUser);

	    // Return the appropriate response (e.g., 201 Created)
	    return ResponseEntity.status(HttpStatus.CREATED).body(like);
	}

	@DeleteMapping("likes/{likeId}")
	public ResponseEntity<?> deleteLike(@PathVariable int likeId) {
	    try {
	        // Retrieve the like from the database using likeId
	        Optional<Like> likeOptional = likeRepo.findById(likeId);
	        if (!likeOptional.isPresent()) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	        }
	        Like like = likeOptional.get();

	        // Invoke the likeService.deleteLike() method to delete the like
	        likeService.deleteLike(like);

	        // Return the appropriate response (e.g., 200 OK)
	        return ResponseEntity.ok().build();
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	    }
	}

	@GetMapping("comments/{commentId}/likes/count")
	public ResponseEntity<Integer> getLikeCount(
		    @PathVariable int commentId) {
	    try {
	        // Retrieve the comment from the database using commentId
	        Optional<Comment> commentOptional = commentRepo.findById(commentId);
	        if (!commentOptional.isPresent()) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	        }
	        Comment comment = commentOptional.get();

	        // Invoke the likeService.getLikeCount() method to get the like count
	        int likeCount = likeService.getLikeCount(comment);

	        // Return the like count in the response body (e.g., 200 OK)
	        return ResponseEntity.ok(likeCount);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	    }
	}

	@GetMapping("comments/{commentId}/likes/has-liked")
	public ResponseEntity<Boolean> hasUserLikedComment(
		    @PathVariable int commentId,
		    @RequestBody User user) {
	    try {
	        // Retrieve the comment from the database using commentId
	        Optional<Comment> commentOptional = commentRepo.findById(commentId);
	        if (!commentOptional.isPresent()) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	        }
	        Comment comment = commentOptional.get();

	        // Retrieve the user from the database using user ID or any authentication mechanism
	        Optional<User> userOptional = userRepo.findById(user.getId());
	        if (!userOptional.isPresent()) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	        }
	        User authenticatedUser = userOptional.get();

	        // Invoke the likeService.hasUserLikedComment() method to check if the user has liked the comment
	        boolean hasLiked = likeService.hasUserLikedComment(authenticatedUser, comment);

	        // Return the result in the response body (e.g., 200 OK)
	        return ResponseEntity.ok(hasLiked);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	    }
	}



}
