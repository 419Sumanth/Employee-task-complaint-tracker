import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class User {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5000/api/users';

  getStaffMembers() {
    return this.http.get<any>(
      `${this.apiUrl}/staff`
    );
  }

  createUser(userData: any) {
    return this.http.post<any>(
      this.apiUrl,
      userData
    );
  }
}