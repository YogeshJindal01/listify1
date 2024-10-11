package com.exampleToDo.ToDoApp.services;

import com.exampleToDo.ToDoApp.DTO.TodoRequestDTO;
import com.exampleToDo.ToDoApp.DTO.UserRequestDTO;
import com.exampleToDo.ToDoApp.entities.Todo;
import com.exampleToDo.ToDoApp.entities.User;
import com.exampleToDo.ToDoApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Use constructor injection to inject dependencies
//    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Register a new user
    public User registerUser(UserRequestDTO userRequestDTO) {
        Optional<User> existingUser = userRepository.findByUsername(userRequestDTO.getUsername());

        // Check if username is already taken
        if (existingUser.isPresent()) {
            throw new RuntimeException("Username already taken");
        }

        // Encrypt the password before saving the user
        User newUser = new User();
        newUser.setUsername(userRequestDTO.getUsername());
        newUser.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));  // Encrypt the password
        if (newUser.getTodos() == null) {
            newUser.setTodos(new ArrayList<>());
        }

        return userRepository.save(newUser);
    }

    // Load user by username for authentication (required by Spring Security)
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return org.springframework.security.core.userdetails.User.builder()
                    .username(user.getUsername())
                    .password(user.getPassword())
                    .roles("USER") // You can set roles as needed
                    .build();
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }

    // Authenticate the user during login
    public Optional<User> loginUser(UserRequestDTO userRequestDTO) {
        Optional<User> user = userRepository.findByUsername(userRequestDTO.getUsername());

        // If user is present and password matches
        if (user.isPresent() && passwordEncoder.matches(userRequestDTO.getPassword(), user.get().getPassword())) {
            return user;
        } else {
            return Optional.empty();
        }
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User addTodoToUser(String username, TodoRequestDTO todoRequestDTO) {
        User user = getUserByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

        Todo todo = new Todo();
        todo.setId(UUID.randomUUID().toString());
        todo.setTitle(todoRequestDTO.getTitle());
        todo.setDescription(todoRequestDTO.getDescription());
        todo.setCompleted(todoRequestDTO.isCompleted());
        todo.setDate(todoRequestDTO.getDate());

        user.getTodos().add(todo);
        return userRepository.save(user);
    }

    public User removeTodoFromUser(String username, String todoId) {
        User user = getUserByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        user.getTodos().removeIf(todo -> todo.getId().equals(todoId));
        return userRepository.save(user);
    }
}
