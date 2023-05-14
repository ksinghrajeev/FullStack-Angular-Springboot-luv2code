package com.luv2code.rajeev.ecommerce.service;

import com.luv2code.rajeev.ecommerce.dao.CustomerRepository;
import com.luv2code.rajeev.ecommerce.dto.CustomerRequest;
import com.luv2code.rajeev.ecommerce.entity.Customer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class CustomerService implements CustomerServiceInt {

    private final CustomerRepository customerRepository;
    @Override
    public void createCustomer(CustomerRequest customerRequest) {
        Customer customer = Customer.builder()
                .firstName(customerRequest.getFirstName())
                .lastName(customerRequest.getLastName())
                .email(customerRequest.getEmail())
                .orders(null)
                .build();

        customerRepository.save(customer);
        log.info("Customer {} is saved",customer.getId());

    }
}
