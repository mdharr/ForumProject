package com.skilldistillery.lorehunter.controllers;

import java.security.Principal;
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
	    Principal principal,
	    @PathVariable int commentId) {
	    // Retrieve the comment from the database using commentId
	    Optional<Comment> commentOptional = commentRepo.findById(commentId);
	    if (!commentOptional.isPresent()) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	    }
	    Comment comment = commentOptional.get();

	    // Get the authenticated user's username from the Principal
	    String username = principal.getName();

	    // Invoke the likeService.createLike() method to create a like
	    Like like = likeService.createLike(comment, username);

	    if (like == null) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }

	    // Return the appropriate response (e.g., 201 Created)
	    return ResponseEntity.status(HttpStatus.CREATED).body(like);
	}

	// rest api endpoint test success in postman
	@DeleteMapping("likes/{likeId}")
	public ResponseEntity<?> deleteLike(
	        Principal principal,
	        @PathVariable int likeId) {
	    try {
	        // Retrieve the like from the database using likeId
	        Optional<Like> likeOptional = likeRepo.findById(likeId);
	        if (!likeOptional.isPresent()) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	        }
	        Like like = likeOptional.get();

	        // Get the authenticated user's username from the Principal
	        String username = principal.getName();

	        // Retrieve the user from the database using the username
	        User authenticatedUser = userRepo.findByUsername(username);
	        if (authenticatedUser == null) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	        }

	        // Check if the authenticated user is the owner of the like
	        if (like.getUser().equals(authenticatedUser)) {
	            // Invoke the likeService.deleteLike() method to delete the like
	            ResponseEntity<?> response = likeService.deleteLike(likeId);

	            if (response.getStatusCode() == HttpStatus.OK) {
	                // Like deleted successfully
	                return ResponseEntity.ok().build();
	            } else {
	                // Other error occurred
	                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	            }
	        } else {
	            // Unauthorized access, authenticated user is not the owner of the like
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	    }
	}

	// rest api endpoint test success in postman
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

	// rest api endpoint test success in postman
	@GetMapping("comments/{commentId}/likes/has-liked")
	public boolean hasUserLikedComment(
	    @PathVariable int commentId,
	    Principal principal) {
	    try {
	        // Retrieve the comment from the database using commentId
	        Optional<Comment> commentOptional = commentRepo.findById(commentId);
	        if (!commentOptional.isPresent()) {
	            return false;
	        }
	        Comment comment = commentOptional.get();

	        // Retrieve the username from the Principal
	        String username = principal.getName();

	        // Invoke the likeService.hasUserLikedComment() method to check if the user has liked the comment
	        boolean hasLiked = likeService.hasUserLikedComment(username, comment);

	        return hasLiked;
	    } catch (Exception e) {
	        e.printStackTrace();
	        return false;
	    }
	}


	@GetMapping("comments/{commentId}/likes/like-id")
	public ResponseEntity<Integer> getLikeId(
	        @PathVariable int commentId,
	        Principal principal) {
	    try {
	        // Retrieve the comment from the database using commentId
	        Optional<Comment> commentOptional = commentRepo.findById(commentId);
	        if (!commentOptional.isPresent()) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	        }
	        Comment comment = commentOptional.get();

	        // Retrieve the username from the Principal
	        String username = principal.getName();

	        // Retrieve the likeId from the likeService
	        Integer likeId = likeService.getLikeId(username, comment);

	        // Return the likeId in the response body (e.g., 200 OK)
	        return ResponseEntity.ok(likeId);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	    }
	}





}
