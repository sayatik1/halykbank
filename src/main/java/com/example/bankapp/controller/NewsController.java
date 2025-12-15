package com.example.bankapp.controller;

import com.example.bankapp.entity.News;
import com.example.bankapp.entity.User;
import com.example.bankapp.service.NewsService;
import com.example.bankapp.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    private final NewsService newsService;
    private final UserService userService;

    public NewsController(NewsService newsService,
                          UserService userService) {
        this.newsService = newsService;
        this.userService = userService;
    }

    // Создать новость (админ)
    @PostMapping("/create")
    public News create(@RequestParam Long authorId,
                       @RequestParam String title,
                       @RequestParam String content) {

        User author = userService.getUserById(authorId);
        return newsService.createNews(title, content, author);
    }

    // Получить все новости
    @GetMapping
    public List<News> getAll() {
        return newsService.getAllNews();
    }
}

