import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Task {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5000/api/tasks';

  createTask(taskData: any) {
    return this.http.post<any>(
      this.apiUrl,
      taskData
    );
  }

  getTasks(params?: any) {
    return this.http.get<any>(
      this.apiUrl,
      { params }
    );
  }

  getDashboardData() {
    return this.http.get<any>(
      `${this.apiUrl}/dashboard`
    );
  }

//   getStaffMembers() {
//   return this.http.get<any>(
//     `${this.apiUrl}/staff`
//   );
// }

  getTaskById(id: string) {
    return this.http.get<any>(
      `${this.apiUrl}/${id}`
    );
  }

  assignTask(id: string, assignedTo: string) {
    return this.http.put<any>(
      `${this.apiUrl}/${id}/assign`,
      { assignedTo }
    );
  }

  updateTaskStatus(id: string, status: string) {
    return this.http.put<any>(
      `${this.apiUrl}/${id}/status`,
      { status }
    );
  }

  addComment(id: string, message: string) {
    return this.http.post<any>(
      `${this.apiUrl}/${id}/comments`,
      { message }
    );
  }
}