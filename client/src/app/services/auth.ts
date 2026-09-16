import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5000/api/auth';

  login(credentials: any) {
    return this.http.post<any>(
      `${this.apiUrl}/login`,
      credentials
    );
  }

  // Store JWT token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Get JWT token
  getToken() {
    return localStorage.getItem('token');
  }

  // Store logged-in user
  setUser(user: any) {
    localStorage.setItem(
      'user',
      JSON.stringify(user)
    );
  }

  // Get logged-in user
  getUser() {
    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;
  }

  // Get current logged-in user
getCurrentUser() {
  return this.http.get<any>(
    `${this.apiUrl}/me`
  );
}

  // Check login status
  isLoggedIn() {
    return !!this.getToken();
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}