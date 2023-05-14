import { Component, Inject, OnInit } from "@angular/core";
import { OKTA_AUTH } from "@okta/okta-angular";
import OktaAuth, { Tokens } from "@okta/okta-auth-js";
import OktaSignIn from "@okta/okta-signin-widget";
import myAppConfig from "src/app/config/my-app-config";

const DEFAULT_ORIGINAL_URI = window.location.origin;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  signIn: any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth){ 
    
    this.signIn = new OktaSignIn({
      logo:'assets/images/logo.png',
      features: {
        registration: true
      },
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      useClassicEngine: true,
    });
  }

  ngOnInit() {
    // When navigating to a protected route, the route path will be saved as the `originalUri`
    // If no `originalUri` has been saved, then redirect back to the app root
    const originalUri = this.oktaAuth.getOriginalUri();
    if (!originalUri || originalUri === DEFAULT_ORIGINAL_URI) {
      this.oktaAuth.setOriginalUri('/');
    }
    
    this.signIn.showSignInToGetTokens({
      el: '#okta-sign-in-widget',
      scopes: myAppConfig.oidc.scopes
    }).then((tokens: Tokens) => {
      // Remove the widget
      this.signIn.remove();

      // In this flow the redirect to Okta occurs in a hidden iframe
      this.oktaAuth.handleLoginRedirect(tokens);
    }).catch((err: any) => {
      // Typically due to misconfiguration
      throw err;
    });
  }

  ngOnDestroy() {
    this.signIn.remove();
  }

}