package com.skilldistillery.lorehunter.entities;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "user_has_follower")
@IdClass(UserFollowerId.class)
public class UserFollower {
	
    @Id
    @ManyToOne
    @JoinColumn(name = "follower_id")
    private User follower;

    @Id
    @ManyToOne
    @JoinColumn(name = "followed_id")
    private User followed;

	public UserFollower() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserFollower(User follower, User followed) {
		super();
		this.follower = follower;
		this.followed = followed;
	}

	public User getFollower() {
		return follower;
	}

	public void setFollower(User follower) {
		this.follower = follower;
	}

	public User getFollowed() {
		return followed;
	}

	public void setFollowed(User followed) {
		this.followed = followed;
	}

	@Override
	public int hashCode() {
		return Objects.hash(followed, follower);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserFollower other = (UserFollower) obj;
		return Objects.equals(followed, other.followed) && Objects.equals(follower, other.follower);
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("UserFollower [follower=");
		builder.append(follower);
		builder.append(", followed=");
		builder.append(followed);
		builder.append("]");
		return builder.toString();
	}
    
}
