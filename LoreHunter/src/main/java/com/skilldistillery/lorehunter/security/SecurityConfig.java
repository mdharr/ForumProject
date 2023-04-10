package com.skilldistillery.lorehunter.security;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // this you get for free when you configure the db connection in application.properties file
    @Autowired
    private DataSource dataSource;

    // this bean is created in the application starter class if you're looking for it
    @Autowired
    private PasswordEncoder encoder;
    
    @Autowired
    private CustomLogoutHandler customLogoutHandler; // Autowire your custom logout handler here
    
    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl(); // You can use the default implementation or any custom implementation of SessionRegistry interface
    }
	
    @Bean
    public SecurityFilterChain createFilterChain(HttpSecurity http) throws Exception {
        http
        .csrf().disable()
        .authorizeRequests()
        .antMatchers(HttpMethod.OPTIONS, "/api/**").permitAll() // For CORS, the preflight request
        .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()     // will hit the OPTIONS on the route
        .antMatchers(HttpMethod.GET, "/api/categories").permitAll() // will hit the OPTIONS on the route
        .antMatchers(HttpMethod.GET, "/api/categories/**").permitAll() // will hit the OPTIONS on the route
        .antMatchers(HttpMethod.GET, "/api/categories/**/posts").permitAll() // will hit the OPTIONS on the route
        .antMatchers(HttpMethod.GET, "/api/categories/**/posts/**").permitAll() // will hit the OPTIONS on the route
        .antMatchers(HttpMethod.PUT, "/api/categories").permitAll() // will hit the OPTIONS on the route
        .antMatchers(HttpMethod.PUT, "/api/categories/**").permitAll() // will hit the OPTIONS on the route
        .antMatchers(HttpMethod.PUT, "/api/categories/**/posts").permitAll() // will hit the OPTIONS on the route
        .antMatchers(HttpMethod.PUT, "/api/categories/**/posts/**").permitAll() // will hit the OPTIONS on the route
        .antMatchers(HttpMethod.PUT, "/api/categories/**/posts/**/comments").permitAll() // will hit the OPTIONS on the route
        .antMatchers(HttpMethod.GET, "/api/categories/**/posts/**/comments").permitAll() // will hit the OPTIONS on the route
        .antMatchers(HttpMethod.PUT, "/api/categories/**/posts/**/viewCount").permitAll() // will hit the OPTIONS on the route
        .antMatchers(HttpMethod.GET, "/api/users/**").permitAll() // will hit the OPTIONS on the route
        .antMatchers(HttpMethod.GET, "/logout").permitAll() // will hit the OPTIONS on the route
        .antMatchers(HttpMethod.PUT, "/logout").permitAll() // will hit the OPTIONS on the route
        .antMatchers(HttpMethod.PUT, "/api/users/**/setOnline").permitAll() // will hit the OPTIONS on the route
        .antMatchers(HttpMethod.PUT, "/api/users/**/setOffline").permitAll() // will hit the OPTIONS on the route
        .antMatchers(HttpMethod.GET, "/api/posts").permitAll() // will hit the OPTIONS on the route
        .antMatchers(HttpMethod.GET, "/api/posts/**/category").permitAll() // will hit the OPTIONS on the route
        .antMatchers(HttpMethod.GET, "/api/comments").permitAll() // will hit the OPTIONS on the route
        .antMatchers(HttpMethod.GET, "/api/sessions/active").permitAll() // will hit the OPTIONS on the route
        .antMatchers(HttpMethod.GET, "/sessions/active").permitAll() // will hit the OPTIONS on the route
        .antMatchers("/api/**").authenticated() // Requests for our REST API must be authorized.
        .anyRequest().permitAll()               // All other requests are allowed without authentication.
        .and()
        .sessionManagement()
        .maximumSessions(1)
        .maxSessionsPreventsLogin(false)
        .expiredUrl("/login")
        .sessionRegistry(sessionRegistry())
        .and()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .httpBasic() // Move httpBasic() here
        .and()
        .logout() // Configure logout handling
        .logoutUrl("logout") // URL for logging out
        .deleteCookies("JSESSIONID") // Delete cookies on logout
        .invalidateHttpSession(true) // Invalidate session on logout
        .addLogoutHandler(customLogoutHandler) // Register custom logout handler
        .logoutSuccessHandler((request, response, authentication) -> {
            // Get the user's session ID
            String sessionId = request.getSession().getId();
            // Remove the session from the SessionRegistry
            sessionRegistry().removeSessionInformation(sessionId);
            // Redirect to logout success page or do other actions
            response.sendRedirect("home");
        })
        .permitAll(); // Allow all users to access logout URL

        http
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        
        return http.build();
    }
    
    @Autowired
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        // Check if username/password are valid, and user currently allowed to authenticate
        String userQuery = "SELECT username, password, enabled FROM user WHERE username=?";
        // Check what authorities the user has
        String authQuery = "SELECT username, role FROM user WHERE username=?";
        auth
        .jdbcAuthentication()
        .dataSource(dataSource)
        .usersByUsernameQuery(userQuery)
        .authoritiesByUsernameQuery(authQuery)
        .passwordEncoder(encoder);
        
    }
    
}