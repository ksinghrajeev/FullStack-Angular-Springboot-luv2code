package com.luv2code.rajeev.ecommerce.service;

import com.luv2code.rajeev.ecommerce.dao.CustomerRepository;
import com.luv2code.rajeev.ecommerce.dto.PurchaseRequest;
import com.luv2code.rajeev.ecommerce.dto.PurchaseResponse;
import com.luv2code.rajeev.ecommerce.entity.Customer;
import com.luv2code.rajeev.ecommerce.entity.Order;
import com.luv2code.rajeev.ecommerce.entity.OrderItem;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CheckoutService implements CheckoutServiceInt {

    private final CustomerRepository customerRepository;

    @Override
    @Transactional
    public PurchaseResponse placeOrder(PurchaseRequest purchaseRequest) {
        // retrieve the order info from dto
        Order order = purchaseRequest.getOrder();

        // generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        //populate order with orderItems
        Set<OrderItem> orderItemSet =  purchaseRequest.getOrderItems().stream()
                .map((OrderItem orderItem) -> mapToOrderItemRequest(orderItem)).collect(Collectors.toSet());

        order.setOrderItemSet(orderItemSet);

        // populate order with billingAddress and shipping Address
        order.setShippingAddress(purchaseRequest.getShippingAddress());
        order.setBillingAddress(purchaseRequest.getBillingAddress());

        // populate customer with order
        Customer customer = purchaseRequest.getCustomer();

        String theEmail = customer.getEmail();

        Customer customerFromDB = customerRepository.findByEmail(theEmail);

        log.info("Customer is {}", customerFromDB.toString());

        if(customerFromDB != null){
            customer = customerFromDB;
            order.setCustomer(customer);
        }

        customer.getOrders().add(order);

        // save to the database
        customerRepository.save(customer);

        // return a response
        return new PurchaseResponse(orderTrackingNumber);
    }

    private OrderItem mapToOrderItemRequest(OrderItem orderItem) {
        return OrderItem.builder()
                .order(orderItem.getOrder())
                .imageUrl(orderItem.getImageUrl())
                .quantity(orderItem.getQuantity())
                .unitPrice(orderItem.getUnitPrice())
                .build();
    }

    private String generateOrderTrackingNumber() {
        // generate a random UUID number (UUID version -4)
        // For details see: https://en.wikipedia.org/wiki/Universally_unique_identifier
        return UUID.randomUUID().toString();
    }
}
