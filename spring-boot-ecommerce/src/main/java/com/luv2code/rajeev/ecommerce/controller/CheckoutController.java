package com.luv2code.rajeev.ecommerce.controller;

import com.luv2code.rajeev.ecommerce.dto.PurchaseRequest;
import com.luv2code.rajeev.ecommerce.dto.PurchaseResponse;
import com.luv2code.rajeev.ecommerce.service.CheckoutServiceInt;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/checkout")
@RequiredArgsConstructor
public class CheckoutController {

    private final CheckoutServiceInt checkoutService;

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody PurchaseRequest purchaseRequest){
        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchaseRequest);
        return purchaseResponse;
    }
}
