package com.example.demo.model;



public class Email {
    private String from,to,fromPss,content, subject;

    public Email() {
    }

    public Email(String from, String to, String fromPss, String content) {
        this.from = from;
        this.to = to;
        this.fromPss = fromPss;
        this.content = content;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getFromPss() {
        return fromPss;
    }

    public void setFromPss(String fromPss) {
        this.fromPss = fromPss;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }
}

