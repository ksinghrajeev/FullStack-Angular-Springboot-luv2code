package com.luv2code.rajeev.ecommerce.service;

import com.luv2code.rajeev.ecommerce.dto.PurchaseRequest;
import com.luv2code.rajeev.ecommerce.dto.PurchaseResponse;

public interface CheckoutServiceInt {

    PurchaseResponse placeOrder(PurchaseRequest purchaseRequest);

}
