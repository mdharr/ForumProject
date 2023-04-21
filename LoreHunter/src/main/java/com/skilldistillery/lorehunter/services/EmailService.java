package com.skilldistillery.lorehunter.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.skilldistillery.lorehunter.entities.User;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String emailFrom;

    @Value("${verification.url:http://localhost:8091/verify-email}")
    private String verificationUrl;

    public void sendVerificationEmail(User user) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(emailFrom);
        message.setTo(user.getEmail());
        message.setSubject("Verify Your Email Address");
        message.setText("Hi " + user.getFirstName() + ",\n\n" +
                "Please click on the following link to verify your email address:\n\n" +
                verificationUrl + "?email=" + user.getEmail() + "&code=" + user.getVerificationCode() + "\n\n" +
                "Thanks,\n" +
                "MyApp");

        mailSender.send(message);
    }
}
