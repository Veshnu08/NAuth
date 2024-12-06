import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], // Corrected from styleUrl to styleUrls
  imports: [NavbarComponent]
})
export class DashboardComponent implements OnInit {

  user = { localID: "someid", displayName: "someone" };
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
   this.auth.canAccess();
   if(this.auth.isAuthenticated()){
    this.auth.detail()?.subscribe({
      next: data =>{
        this.user.localID = data.users[0].localId;
        this.user.displayName = data.users[0].displayName;
      }
    })
   }
  }
}