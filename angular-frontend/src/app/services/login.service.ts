import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../common/customer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = environment.luv2shopApiUrl ;
  
  constructor(private httpClient: HttpClient) { }

  
  getLoggedInCustomer(email : string): Observable<Customer> {
    email = email.replace(/"/g,'');
    const customerUrl =  `${this.baseUrl}/customers/search/findByEmail?email=${email}`
    console.log(`In getLoggedInCustomer with email ${email}`);
    return this.httpClient.get<Customer>(customerUrl);
  }

  createCustomer(customer: any): Observable<any> {
    console.log(`In createCustomer`);
    return this.httpClient.post<Customer>(this.baseUrl + "/customer", customer, {headers: {skip: 'true'}});  
  }
}
