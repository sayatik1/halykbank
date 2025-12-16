package com.example.bankapp.service;

import com.example.bankapp.entity.News;
import com.example.bankapp.entity.User;
import com.example.bankapp.exception.NotFoundException;
import com.example.bankapp.repository.NewsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsService {

    private final NewsRepository newsRepository;

    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    // Создание новости
    public News create(String title, String content, User author) {
        News news = new News(title, content, author);
        return newsRepository.save(news);
    }

    // Получить все новости
    public List<News> getAll() {
        return newsRepository.findAll();
    }

    // Удалить новость
    public void delete(Long id) {
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Новость не найдена"));
        newsRepository.delete(news);
    }
}
