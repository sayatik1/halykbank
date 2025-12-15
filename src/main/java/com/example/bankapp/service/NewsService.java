package com.example.bankapp.service;

import com.example.bankapp.entity.News;
import com.example.bankapp.entity.User;
import com.example.bankapp.repository.NewsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsService {

    private final NewsRepository newsRepository;

    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    public News createNews(String title, String content, User author) {
        News news = new News(title, content, author);
        return newsRepository.save(news);
    }

    public List<News> getAllNews() {
        return newsRepository.findAll();
    }
}

