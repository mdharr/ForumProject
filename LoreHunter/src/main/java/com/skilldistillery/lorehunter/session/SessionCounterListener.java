package com.skilldistillery.lorehunter.session;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

public class SessionCounterListener implements HttpSessionListener {
	
	private static int activeSessionCount = 0;
	
	@Override
	public void sessionCreated(HttpSessionEvent se) {
		activeSessionCount++;
	}
	
	@Override
	public void sessionDestroyed(HttpSessionEvent se) {
		activeSessionCount--;
	}
	
	public static int getActiveSessionCount() {
		return activeSessionCount;
	}

}
