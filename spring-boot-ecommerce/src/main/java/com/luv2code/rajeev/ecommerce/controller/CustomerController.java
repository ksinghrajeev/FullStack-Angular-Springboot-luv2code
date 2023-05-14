package com.luv2code.rajeev.ecommerce.controller;

import com.luv2code.rajeev.ecommerce.dto.CustomerRequest;
import com.luv2code.rajeev.ecommerce.service.CustomerServiceInt;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Slf4j
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerServiceInt customerService;

    @PostMapping("/customer")
    public void createCustomer(@RequestBody CustomerRequest customerRequest){
        log.info("Customer Request is {}", customerRequest.toString());
        customerService.createCustomer(customerRequest);
    }
}
