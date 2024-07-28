import { Component } from '@angular/core';
import {AuthenticationRequest} from "../../services/models/authentication-request";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {AuthService} from "../../services/myservices/AuthService";
import {TokenService} from "../../services/token/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(private router: Router,
              private authService: AuthenticationService,
              private tokenService: TokenService,
              private auth: AuthService) {
  }

  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        this.router.navigate(['books']);
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.businessErrorDescription);
        }
      }
    })

    /*this.auth.authenticate(this.authRequest).subscribe(
      response => {
        // Handle successful authentication
        console.log('Authentication successful:', response);
      },
      error => {
        // Handle authentication errors
        console.error('Authentication failed:', error);
      }
    );*/
  }

  register() {
    this.router.navigate(['register'])
  }
}
