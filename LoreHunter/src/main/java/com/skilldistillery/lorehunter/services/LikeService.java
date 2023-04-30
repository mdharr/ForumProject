package com.skilldistillery.lorehunter.services;

import com.skilldistillery.lorehunter.entities.Comment;
import com.skilldistillery.lorehunter.entities.Like;
import com.skilldistillery.lorehunter.entities.User;

public interface LikeService {

    public Like createLike(Comment comment, User user);

    public void deleteLike(Like like);

    public int getLikeCount(Comment comment);

    public boolean hasUserLikedComment(User user, Comment comment);

}
