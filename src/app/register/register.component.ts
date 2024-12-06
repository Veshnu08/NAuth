import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, NavbarComponent, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  formdata = {name:"", email:"", password:""};
  submit = false;
  errorMessage = "";
  loading = false;

  constructor(private auth : AuthService){}

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit(){
    this.loading = true ;

    // CALL REGISTER SEVICE

    this.auth
    .register(this.formdata.name , this.formdata.email, this.formdata.password)
    .subscribe({
      next:data =>{
        // STORE TOKEN FROM RESPONSE DATA 
        this.auth.storeToken(data.idToken);
        console.log('Registered idToken is'+ data.idToken);
        this.auth.canAuthenticate();
      },
      error:data => {
        if(data.error.error.message == "INVAILD_EMAIL"){
          this.errorMessage = "Invaild Email!";
        }else if (data.error.error.message=="EMAIL_EXISTS"){
          this.errorMessage = "Already Email Exists!";
        }else{
          this.errorMessage = "Unknown error occured when creating this account!";
        }
      }
    }).add(()=>{
      this.loading = false;
      console.log('Register process completed!');
    })
  }


}
