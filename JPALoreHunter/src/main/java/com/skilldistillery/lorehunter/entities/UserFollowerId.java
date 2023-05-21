package com.skilldistillery.lorehunter.entities;

import java.io.Serializable;
import java.util.Objects;

public class UserFollowerId implements Serializable {
	
    private static final long serialVersionUID = 1L;

    private int follower;

    private int followed;

	public UserFollowerId() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserFollowerId(int follower, int followed) {
		super();
		this.follower = follower;
		this.followed = followed;
	}

	public int getFollower() {
		return follower;
	}

	public void setFollower(int follower) {
		this.follower = follower;
	}

	public int getFollowed() {
		return followed;
	}

	public void setFollowed(int followed) {
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
		UserFollowerId other = (UserFollowerId) obj;
		return Objects.equals(followed, other.followed) && Objects.equals(follower, other.follower);
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("UserFollowerId [follower=");
		builder.append(follower);
		builder.append(", followed=");
		builder.append(followed);
		builder.append("]");
		return builder.toString();
	}
    
}
