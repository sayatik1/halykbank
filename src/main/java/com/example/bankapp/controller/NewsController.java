package com.example.bankapp.controller;

import com.example.bankapp.dto.NewsRequest;
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

    public NewsController(NewsService newsService, UserService userService) {
        this.newsService = newsService;
        this.userService = userService;
    }

    // =========================
    // CREATE NEWS (ADMIN)
    // POST /api/news
    // =========================
    @PostMapping
    public News create(@RequestBody NewsRequest request) {

        User author = userService.getUserById(request.getAuthorId());

        return newsService.create(
                request.getTitle(),
                request.getContent(),
                author
        );
    }

    // =========================
    // GET ALL NEWS
    // GET /api/news
    // =========================
    @GetMapping
    public List<News> getAll() {
        return newsService.getAll();
    }

    // =========================
    // DELETE NEWS (ADMIN)
    // DELETE /api/news/{id}
    // =========================
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        newsService.delete(id);
    }
}
