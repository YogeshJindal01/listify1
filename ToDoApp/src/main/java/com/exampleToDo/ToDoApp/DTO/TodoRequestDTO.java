package com.exampleToDo.ToDoApp.DTO;

import java.util.Date;

public class TodoRequestDTO {
    private String title;
    private String description;
    private boolean completed;
    private Date date;
    private String userId;// Optional: if you're setting the date

    // Constructors
//    public TodoRequestDTO() {}

    public TodoRequestDTO(String title, String description, boolean completed, Date date) {
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.date = date;
    }

    // Getters and Setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    // Add getter and setter for userId
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}

