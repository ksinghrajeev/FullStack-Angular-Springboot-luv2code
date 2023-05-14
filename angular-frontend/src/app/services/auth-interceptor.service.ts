import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.handleAccess(request, next);
  }

  private handleAccess(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // Only add an access token for secured endpoints
    const securedEndpoints = [environment.luv2shopApiUrl + '/orders'];

    if(securedEndpoints.some(url => request.urlWithParams.includes(url))){

      //get access token
      const accessToken = this.oktaAuth.getAccessToken();

      console.log(`accessToken is ${accessToken}`);
      
      // clone the request and add new header with access token
      request =request.clone({
        setHeaders:{
          // Authorization: 'Bearer '
          Authorization: 'Bearer ' + accessToken
        }
      });
    }
    return next.handle(request);
  }
}