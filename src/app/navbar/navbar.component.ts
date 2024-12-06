import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService) { }



ngOnInit(): void {}

logout(){
  this.auth.removeToken();
  this.auth.canAccess();
}

}
