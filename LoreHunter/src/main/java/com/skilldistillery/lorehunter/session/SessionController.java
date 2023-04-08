package com.skilldistillery.lorehunter.session;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin({ "*", "http://localhost/"})
@RestController
public class SessionController {
	
	@GetMapping("sessions/active")
	public int getActiveSessionCount() {
		return SessionCounterListener.getActiveSessionCount();
	}

}
