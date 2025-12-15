package com.example.bankapp.service;

import com.example.bankapp.entity.Role;
import com.example.bankapp.entity.User;
import com.example.bankapp.repository.RoleRepository;
import com.example.bankapp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository,
                       RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    // ===== CREATE USER =====
    public User createUser(User user) {
        Role userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Role USER not found"));

        user.setRole(userRole);
        return userRepository.save(user);
    }

    // ===== GET USER BY ID =====
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // ===== GET ALL USERS =====
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Wrong password");
        }

        return user;
    }

}

