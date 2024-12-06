import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
  ) { }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) { // Check if running in the browser
      return sessionStorage.getItem('token') !== null;
    }
    return false; // Return false if not in the browser
  }

  canAccess() {
    if (!this.isAuthenticated()) {
      // Redirect to login
      this.router.navigate(['/login']);
    }
  }

  canAuthenticate() {
    if (this.isAuthenticated()) {
      // Redirect to dashboard
      this.router.navigate(['/dashboard']);
    }
  }

  register(name: string, email: string, password: string) {
    // Send data to register API (Firebase)
    return this.http.post<{ idToken: string }>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[APIKEY]',
      { displayName: name, email, password }
    );
  }

  storeToken(token: string) {
    if (isPlatformBrowser(this.platformId)) { // Check if running in the browser
      sessionStorage.setItem('token', token);
    }
  }

  login(email: string, password: string) {
    // Send data to login API (Firebase)
    return this.http.post<{ idToken: string }>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[APIKEY]',
      { email, password }
    );
  }

  detail() {
    if (isPlatformBrowser(this.platformId)) { // Check if running in the browser
      let token = sessionStorage.getItem('token');
      return this.http.post<{ users: Array<{ localId: string, displayName: string }> }>(
        'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[APIKEY]',
        { idToken: token }
      );
    }
    return null; // Handle the case when not in the browser
  }

  removeToken() {
    if (isPlatformBrowser(this.platformId)) { // Check if running in the browser
      sessionStorage.removeItem('token');
    }
  }
}
