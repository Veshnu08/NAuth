import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path:'login',component:LoginComponent},
    {path: 'dashboard', component:DashboardComponent},
];
