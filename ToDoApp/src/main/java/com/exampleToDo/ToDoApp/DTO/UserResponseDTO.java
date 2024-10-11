package com.exampleToDo.ToDoApp.DTO;

import java.util.List;

import java.util.List;
import com.exampleToDo.ToDoApp.entities.Todo;

public class UserResponseDTO {
    private String username;
    private List<Todo> todos;
    private String token;

    // Constructors
    public UserResponseDTO() {}

    public UserResponseDTO(String username,List<Todo> todos) {
        this.username = username;
        this.todos = todos;
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}


