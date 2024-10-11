package com.exampleToDo.ToDoApp.services;

import com.exampleToDo.ToDoApp.DTO.TodoRequestDTO;
import com.exampleToDo.ToDoApp.entities.Todo;
import com.exampleToDo.ToDoApp.entities.User;
import com.exampleToDo.ToDoApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TodoService {

    @Autowired
    private UserRepository userRepository;

    // Create a new to-do for a specific user
    public Todo createTodoForUser(String username, TodoRequestDTO todoRequestDTO) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        User user = optionalUser.orElseThrow(() -> new RuntimeException("User not found"));

        todoRequestDTO.setUserId(user.getId());
        if (user.getTodos() == null) {
            user.setTodos(new ArrayList<>());
        }

        Todo todo = new Todo();
        todo.setId(UUID.randomUUID().toString());
        todo.setTitle(todoRequestDTO.getTitle());
        todo.setDescription(todoRequestDTO.getDescription());
        todo.setCompleted(todoRequestDTO.isCompleted());
        todo.setDate(todoRequestDTO.getDate());
        todo.setUser(user);  // Associate the to-do with the user

        user.getTodos().add(todo);
        userRepository.save(user);

        return todo;
    }

    // Get all to-dos for a specific user
    public List<Todo> getTodosForUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getTodos();
    }

    // Get a specific to-do by ID for a specific user
    public Todo getTodoByIdForUser(String username, String todoId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getTodos().stream()
                .filter(todo -> todo.getId() != null && todo.getId().equals(todoId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Todo not found"));
    }

    // Update a to-do for a specific user
    public Todo updateTodoForUser(String username, String todoId, TodoRequestDTO updatedTodoDTO) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Todo todoToUpdate = user.getTodos().stream()
                .filter(todo -> todo.getId().equals(todoId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        todoToUpdate.setTitle(updatedTodoDTO.getTitle());
        todoToUpdate.setDescription(updatedTodoDTO.getDescription());
        todoToUpdate.setCompleted(updatedTodoDTO.isCompleted());
        todoToUpdate.setDate(updatedTodoDTO.getDate());

        userRepository.save(user);
        return todoToUpdate;
    }

    // Delete a to-do by ID for a specific user
    public void deleteTodoByIdForUser(String username, String todoId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean removed = user.getTodos().removeIf(todo -> todo.getId().equals(todoId));

        if (!removed) {
            throw new RuntimeException("Todo not found or unable to delete");
        }

        userRepository.save(user);
    }

    // Mark a to-do as completed for a specific user
    public Todo markTodoCompleteForUser(String username, String todoId) {
        Todo todo = getTodoByIdForUser(username, todoId);
        todo.setCompleted(true);
        userRepository.save(todo.getUser());
        return todo;
    }

    // Mark a to-do as incomplete for a specific user
    public Todo markTodoIncompleteForUser(String username, String todoId) {
        Todo todo = getTodoByIdForUser(username, todoId);
        todo.setCompleted(false);
        userRepository.save(todo.getUser());
        return todo;
    }
}
