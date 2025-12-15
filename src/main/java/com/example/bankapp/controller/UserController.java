package com.example.bankapp.controller;

import com.example.bankapp.entity.User;
import com.example.bankapp.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Регистрация пользователя
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.createUser(user);
    }

    // Получить пользователя по ID
    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // Получить всех пользователей (админ)
    @GetMapping
    public List<User> getAll() {
        return userService.getAllUsers();
    }
    @PostMapping("/login")
    public User login(@RequestBody User loginData) {
        return userService.login(
                loginData.getEmail(),
                loginData.getPassword()
        );
    }

}

