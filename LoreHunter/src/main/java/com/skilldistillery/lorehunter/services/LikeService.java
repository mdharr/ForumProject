package com.skilldistillery.lorehunter.services;

import org.springframework.http.ResponseEntity;

import com.skilldistillery.lorehunter.entities.Comment;
import com.skilldistillery.lorehunter.entities.Like;
import com.skilldistillery.lorehunter.entities.User;

public interface LikeService {

    public Like createLike(Comment comment, String username);

    public ResponseEntity<?> deleteLike(int likeId);

    public int getLikeCount(Comment comment);

    public boolean hasUserLikedComment(String username, Comment comment);

}
