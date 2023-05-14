import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { catchError, of } from 'rxjs';

import { Customer } from 'src/app/common/customer';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  userName: string | null = null;
  theEmail :  string | null = null;

  //Reference to web browser's session storage
  storage:  Storage = sessionStorage;
  
  customerFound: boolean = true;

  constructor(@Inject(OKTA_AUTH) public oktaAuth: OktaAuth, 
              public authStateService: OktaAuthStateService,
              public loginService: LoginService) {
    console.log("Inside LoginStatusComponent");
   
    // Subscribe to authentication state changes
   this.authStateService.authState$.subscribe(
      (result) => {
        if (result.isAuthenticated) {
          // Fetch the logged in user details (user's claims)
          //
          // user full name is exposed as a property name
          this.oktaAuth.getUser().then(
            res => {
              this.userName = res.name!;
              this.theEmail = res.email!;
              
              // now store the email in browser storage
              this.storage.setItem('userEmail', JSON.stringify(this.theEmail));
              this.storage.setItem('userName', JSON.stringify(this.userName));
            }
          );
        }
      }
    );
  }

  async ngOnInit () {
    await this.checkUserinDB();
  }
   
  async logout() {
    await this.oktaAuth.signOut();;
  }

  async checkUserinDB(){
     // set up Customer
    
    this.oktaAuth.getUser().then(
      (res) => {
        this.loginService.getLoggedInCustomer(res.email!)
          .pipe(
            catchError(error => {
              this.customerFound = false;
              console.log(`this.customerFound is: ${this.customerFound}`);
              return of();
            })
          ).subscribe();  
      }
    );
    if(this.customerFound == false) {
      this.createCustomer();
    }
  }

  createCustomer(){
    let theCustomer = new Customer();
    theCustomer.email = JSON.parse(this.storage.getItem('userEmail')!);
    theCustomer.firstName = JSON.parse(this.storage.getItem('name')!).split(' ')[0];
    theCustomer.lastName =  JSON.parse(this.storage.getItem('name')!).split(' ')[1];
    console.log(`Customer to be Save is ${JSON.stringify(theCustomer)}`);
    console.log("Going to Save Cusotmer" + JSON.stringify(theCustomer));
    this.loginService.createCustomer(theCustomer).subscribe({
      next: data => {
        console.log("Customer is saved" + JSON.stringify(data));
      }
    });
  }
}