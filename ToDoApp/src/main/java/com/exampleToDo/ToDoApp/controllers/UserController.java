package com.exampleToDo.ToDoApp.controllers;

import com.exampleToDo.ToDoApp.DTO.UserRequestDTO;
import com.exampleToDo.ToDoApp.DTO.TodoRequestDTO;
import com.exampleToDo.ToDoApp.entities.User;
import com.exampleToDo.ToDoApp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody UserRequestDTO userRequestDTO) {
        User registeredUser = userService.registerUser(userRequestDTO);
        return ResponseEntity.ok(registeredUser);
    }

    // Login a user
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody UserRequestDTO userRequestDTO) {
        return userService.loginUser(userRequestDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build());
    }

    // Add a to-do for a user
    @PostMapping("/{username}/todos")
    public ResponseEntity<User> addTodoToUser(@PathVariable String username, @RequestBody TodoRequestDTO todoRequestDTO) {
        User updatedUser = userService.addTodoToUser(username, todoRequestDTO);
        return ResponseEntity.ok(updatedUser);
    }

    // Remove a to-do for a user
    @DeleteMapping("/{username}/todos/{todoId}")
    public ResponseEntity<User> removeTodoFromUser(@PathVariable String username, @PathVariable String todoId) {
        User updatedUser = userService.removeTodoFromUser(username, todoId);
        return ResponseEntity.ok(updatedUser);
    }
}
