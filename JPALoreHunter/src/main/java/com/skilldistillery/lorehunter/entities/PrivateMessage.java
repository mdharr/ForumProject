package com.skilldistillery.lorehunter.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "private_message")
public class PrivateMessage {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

}
