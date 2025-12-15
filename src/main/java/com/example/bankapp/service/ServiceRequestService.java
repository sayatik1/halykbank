package com.example.bankapp.service;

import com.example.bankapp.entity.BankService;
import com.example.bankapp.entity.ServiceRequest;
import com.example.bankapp.entity.User;
import com.example.bankapp.repository.ServiceRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceRequestService {

    private final ServiceRequestRepository serviceRequestRepository;

    public ServiceRequestService(ServiceRequestRepository serviceRequestRepository) {
        this.serviceRequestRepository = serviceRequestRepository;
    }

    public ServiceRequest createRequest(User user, BankService service) {
        ServiceRequest request = new ServiceRequest(user, service);
        return serviceRequestRepository.save(request);
    }

    public List<ServiceRequest> getUserRequests(Long userId) {
        return serviceRequestRepository.findByUserId(userId);
    }

    public ServiceRequest updateStatus(ServiceRequest request, String status) {
        request.setStatus(status);
        return serviceRequestRepository.save(request);
    }
    public ServiceRequest getById(Long id) {
        return serviceRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
    }

}


