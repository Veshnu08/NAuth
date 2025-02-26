import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, NavbarComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formdata = {email:"",password:""};
  submit=false;
  loading=false;
  errorMessage="";
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit() {
    this.loading = true;

    this.auth.login(this.formdata.email, this.formdata.password)
      .subscribe({
        next: data => {
          this.auth.storeToken(data.idToken);
          console.log('Logged user token is ' + data.idToken);
          this.auth.canAuthenticate();
        },
        error: data => {
          
          if (data.error.error.message === "INVALID_PASSWORD" || data.error.error.message === "INVALID_EMAIL") {
            this.errorMessage = "Invalid Credentials!";
          } else {
            this.errorMessage = "Unknown error when logging into this account!";
          }
        }
      }).add(() => {
        this.loading = false;
        console.log('Login process completed!');
      });
  }
}


