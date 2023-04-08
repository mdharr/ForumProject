package com.skilldistillery.lorehunter.session;

import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SessionConfig {
	
    @Bean
    public ServletListenerRegistrationBean<SessionCounterListener> sessionCounterListener() {
        ServletListenerRegistrationBean<SessionCounterListener> listenerRegBean =
                new ServletListenerRegistrationBean<>();
        listenerRegBean.setListener(new SessionCounterListener());
        return listenerRegBean;
    }

}
