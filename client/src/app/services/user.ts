import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class User {
  private http = inject(HttpClient);

  private apiUrl = 'https://employee-task-complaint-tracker-api.onrender.com/api/users';

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