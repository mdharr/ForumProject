package com.skilldistillery.lorehunter.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user_conversation")
public class UserConversation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

}
