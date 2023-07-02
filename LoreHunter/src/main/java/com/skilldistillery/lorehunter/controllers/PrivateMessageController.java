package com.skilldistillery.lorehunter.controllers;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.lorehunter.entities.PrivateMessage;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.entities.UserConversation;
import com.skilldistillery.lorehunter.repositories.UserConversationRepository;
import com.skilldistillery.lorehunter.services.PrivateMessageService;
import com.skilldistillery.lorehunter.services.UserConversationService;
import com.skilldistillery.lorehunter.services.UserService;

@CrossOrigin({ "*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class PrivateMessageController {
	
	@Autowired
	private PrivateMessageService privateMessageService;
	
	@Autowired
	private UserConversationService userConversationService;
	
	@Autowired
	private UserConversationRepository userConversationRepo;
	
	@Autowired
	private UserService userService;
	
	//api endpoint postman test success
    @GetMapping("conversations/{cid}/messages")
    public ResponseEntity<List<PrivateMessage>> getMessagesForConversation(@PathVariable("cid") int conversationId, Principal principal) {
    	Optional<UserConversation> conversationOpt = userConversationRepo.findById(conversationId);
    	if (conversationOpt.isPresent()) {
    		UserConversation conversation = conversationOpt.get();
    		if (conversation != null) {
    			List<PrivateMessage> privateMessages = conversation.getPrivateMessages();
    			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    			String username = authentication.getName();
    			User authenticatedUser = userService.showByUsername(username);
    			// You may add additional authorization logic here if needed
    			
    			return new ResponseEntity<>(privateMessages, HttpStatus.OK);
    		}
    	}
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    // api endpoint test successfully with postman
    @GetMapping("users/{uid}/conversations/{cid}/messages")
    public ResponseEntity<List<PrivateMessage>> getMessagesForConversationAndUser(@PathVariable("cid") int conversationId, @PathVariable("uid") int userId, Principal principal) {
    	Optional<UserConversation> conversationOpt = userConversationRepo.findById(conversationId);
    	if (conversationOpt.isPresent()) {
    		UserConversation conversation = conversationOpt.get();
    		if (conversation != null) {
    			List<PrivateMessage> privateMessages = conversation.getPrivateMessages();
    			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    			String username = authentication.getName();
    			User authenticatedUser = userService.showByUsername(username);
    			if (authenticatedUser.getId() != userId) {
    				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    			}
    			return new ResponseEntity<>(privateMessages, HttpStatus.OK);
    		}
    	}
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    // api endpoint postman test success
    @PostMapping("conversations/{cid}/messages")
    public ResponseEntity<PrivateMessage> createMessage(@RequestBody PrivateMessage privateMessage, @PathVariable("cid") int conversationId, Principal principal) {
        Optional<UserConversation> conversationOpt = userConversationRepo.findById(conversationId);
        if (conversationOpt.isPresent()) {
            UserConversation conversation = conversationOpt.get();
            List<PrivateMessage> privateMessages = conversation.getPrivateMessages();
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User authenticatedUser = userService.showByUsername(username);
            
            // Set the sender and recipient of the private message
            privateMessage.setSender(authenticatedUser);
            User recipient = privateMessage.getRecipient();
            privateMessage.setRecipient(recipient);
            privateMessage.setUserConversation(conversation);
            PrivateMessage newPrivateMessage = privateMessageService.savePrivateMessage(privateMessage);
            if (newPrivateMessage == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            } else {
                privateMessages.add(newPrivateMessage);
                return new ResponseEntity<>(privateMessage, HttpStatus.CREATED);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    // TODO: create rest api endpoint to delete private messages and user conversations
    // TODO: when a conversation is deleted, it is only hidden from the user who deletes it
    
    
    // TODO: implement notifications into private messages so user is notified upon receiving new private messages
    // TODO: create separate notifications for private messages
    // TODO: create separate endpoint for dismissing notifications
    // TODO: create endpoint for accepting private messages
    // TODO: create endpoint for marking private messages as read
    // TODO: create endpoint for pinning user conversation
    // TODO: create endpoint for ignoring user conversations and private messages from a user

}
