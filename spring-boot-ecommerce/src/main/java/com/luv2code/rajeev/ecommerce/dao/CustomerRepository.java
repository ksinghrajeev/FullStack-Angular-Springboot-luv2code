package com.luv2code.rajeev.ecommerce.dao;

import com.luv2code.rajeev.ecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.RequestParam;

@RepositoryRestResource
public interface CustomerRepository extends JpaRepository<Customer, Long>{
    Customer findByEmail(@RequestParam("email") String email);
}
