package com.luv2code.rajeev.ecommerce.dto;

import com.luv2code.rajeev.ecommerce.entity.Address;
import com.luv2code.rajeev.ecommerce.entity.Customer;
import com.luv2code.rajeev.ecommerce.entity.Order;
import com.luv2code.rajeev.ecommerce.entity.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PurchaseRequest {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
