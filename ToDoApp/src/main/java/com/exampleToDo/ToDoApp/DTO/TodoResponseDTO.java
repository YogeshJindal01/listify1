package com.exampleToDo.ToDoApp.DTO;

import java.util.Date;

public class TodoResponseDTO {
    private String id;      // Unique ID of the todo
    private String title;
    private String description;
    private boolean completed;
    private Date date;      // Optional: if you're returning the date

    // Constructors
    public TodoResponseDTO() {}

    public TodoResponseDTO(String id, String title, String description, boolean completed, Date date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.date = date;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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
}

