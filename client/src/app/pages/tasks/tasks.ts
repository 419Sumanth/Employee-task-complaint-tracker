import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Task } from '../../services/task';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule,RouterLink],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit {
  private taskService = inject(Task);

  tasks = signal<any[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  search = '';
  status = '';
  category = '';
  assignedTo = '';

  ngOnInit() {
    this.loadTasks();
  }

loadTasks() {
  this.loading.set(true);
  this.errorMessage.set('');

  const params: any = {};

  if (this.search.trim()) {
    params.search = this.search.trim();
  }

  if (this.status) {
    params.status = this.status;
  }

  if (this.category) {
    params.category = this.category;
  }

  if (this.assignedTo) {
    params.assignedTo = this.assignedTo;
  }

  console.log('Sending params:', params);

  this.taskService.getTasks(params).subscribe({
    next: (response: any) => {
      console.log('TASK API RESPONSE:', response);

      this.tasks.set(response.tasks || []);

      console.log('TASKS SIGNAL:', this.tasks());

      this.loading.set(false);
    },

    error: (error: any) => {
      console.error('TASK API ERROR:', error);

      this.errorMessage.set(
        error.error?.message || 'Failed to load tasks'
      );

      this.loading.set(false);
    },
  });
}

  clearFilters() {
    this.search = '';
    this.status = '';
    this.category = '';
    this.assignedTo = '';

    this.loadTasks();
  }
}