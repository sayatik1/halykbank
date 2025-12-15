package com.example.bankapp.controller;

import com.example.bankapp.entity.BankService;
import com.example.bankapp.entity.ServiceRequest;
import com.example.bankapp.entity.User;
import com.example.bankapp.service.BankServiceService;
import com.example.bankapp.service.ServiceRequestService;
import com.example.bankapp.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class ServiceRequestController {

    private final ServiceRequestService requestService;
    private final UserService userService;
    private final BankServiceService bankServiceService;

    public ServiceRequestController(ServiceRequestService requestService,
                                    UserService userService,
                                    BankServiceService bankServiceService) {
        this.requestService = requestService;
        this.userService = userService;
        this.bankServiceService = bankServiceService;
    }

    // Создать заявку
    @PostMapping("/create")
    public ServiceRequest create(@RequestParam Long userId,
                                 @RequestParam Long serviceId) {

        User user = userService.getUserById(userId);
        BankService service = bankServiceService.getById(serviceId);

        return requestService.createRequest(user, service);
    }

    // Получить заявки пользователя
    @GetMapping("/user/{userId}")
    public List<ServiceRequest> getUserRequests(@PathVariable Long userId) {
        return requestService.getUserRequests(userId);
    }

    // Изменить статус заявки (админ)
    @PutMapping("/{requestId}/status")
    public ServiceRequest updateStatus(@PathVariable Long requestId,
                                       @RequestParam String status) {

        ServiceRequest request = requestService.getById(requestId);
        return requestService.updateStatus(request, status);
    }
}

