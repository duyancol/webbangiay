package com.example.demo.model;




import  java.util.Date;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
public class EmailUntilt {
    public static void send(Email email) throws Exception {
        Properties properties = new Properties();
        properties.put("mail.smtp.host","smtp.gmail.com");
        properties.put("mail.smtp.port", "587");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.ssl.protocols", "TLSv1.2");
        properties.put("mail.smtp.starttls.enable", "true");

        Session session =Session.getInstance(properties, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication(){
                return  new PasswordAuthentication(email.getFrom(),email.getFromPss());
            }
        });
        try {
            Message message= new MimeMessage(session);
            message.setFrom(new InternetAddress(email.getFrom()));
            message.setRecipients(Message.RecipientType.TO,InternetAddress.parse(email.getTo()));
            message.setSubject(email.getSubject());

            message.setContent(email.getContent(),"text/html; charset=utf-8");
            Transport.send(message);
            System.out.println("done");

        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }
    }
    public static void main(String[] args) throws Exception {
        Email email = new Email("nguyenduy.30719@gmail.com","nguyenduy.30719@gmail.com","iuntfgqwytqmwsvr","dfsfd");

        send(email);

    }
    public static void sendEmail(String host, String port,
                                 Email email) throws AddressException,
            MessagingException {

        // sets SMTP server properties
        Properties properties = new Properties();
//    properties.put("mail.smtp.host", host);
//    properties.put("mail.smtp.port", port);
//    properties.put("mail.smtp.auth", "true");
//    properties.put("mail.smtp.starttls.enable", "true");
//    properties.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", port);
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.ssl.protocols", "TLSv1.2");
        properties.put("mail.smtp.starttls.enable", "true");

        // creates a new session with an authenticator
        Authenticator auth = new Authenticator() {
            public PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(email.getFrom(), email.getFromPss());
            }
        };

        Session session = Session.getInstance(properties, auth);

        // creates a new e-mail message
        Message msg = new MimeMessage(session);

        msg.setFrom(new InternetAddress(email.getFrom()));
        InternetAddress[] toAddresses = { new InternetAddress(email.getTo()) };
        msg.setRecipients(Message.RecipientType.TO, toAddresses);
        msg.setSubject(email.getSubject());
        msg.setSentDate(new Date());
        msg.setText(email.getContent());

        // sends the e-mail
        Transport.send(msg);
        System.out.println("tt");

    }
}



