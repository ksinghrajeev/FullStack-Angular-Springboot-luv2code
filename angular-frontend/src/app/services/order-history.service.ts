import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistory } from '../common/order-history';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderUrl = environment.luv2shopApiUrl + '/orders';

  constructor(public httpClient : HttpClient) { }

  getOrderHistory(theEmail :string): Observable<GetResponseOrderHisotry> {
    const OrderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmail?email=${theEmail}`;
    return this.httpClient.get<GetResponseOrderHisotry>(OrderHistoryUrl);
  }
}

interface GetResponseOrderHisotry{
  _embedded: {
    orders: OrderHistory [];
  } 
}
