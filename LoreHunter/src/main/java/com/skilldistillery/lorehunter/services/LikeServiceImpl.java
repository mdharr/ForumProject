package com.skilldistillery.lorehunter.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.lorehunter.entities.Comment;
import com.skilldistillery.lorehunter.entities.Like;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.repositories.LikeRepository;

@Service
public class LikeServiceImpl implements LikeService {
	
	@Autowired
	private LikeRepository likeRepo;

	@Override
    public Like createLike(Comment comment, User user) {
        Like like = new Like();
        like.setComment(comment);
        like.setUser(user);
        return likeRepo.save(like);
    }

	@Override
    public void deleteLike(Like like) {
        likeRepo.delete(like);
    }

	@Override
    public int getLikeCount(Comment comment) {
        return likeRepo.countByComment(comment);
    }

	@Override
    public boolean hasUserLikedComment(User user, Comment comment) {
        return likeRepo.existsByUserAndComment(user, comment);
    }

}
