import { Component, inject, OnInit, signal } from '@angular/core';

import { Auth } from '../../services/auth';
import { Task } from '../../services/task';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  private authService = inject(Auth);
  private taskService = inject(Task);

  user = signal<any>(null);

  dashboardData = signal<any>(null);

  totalTasks = signal(0);

  errorMessage = signal('');

  ngOnInit() {

    console.log('DASHBOARD COMPONENT LOADED');

    this.authService.getCurrentUser().subscribe({

      next: (response: any) => {

        console.log('CURRENT USER:', response);

        this.user.set(response.user);

        this.loadDashboard();

      },

      error: (error: any) => {

        console.error('CURRENT USER ERROR:', error);

        this.errorMessage.set(
          error.error?.message ||
          'Failed to load user information'
        );

      },

    });

  }

  loadDashboard() {

    this.taskService.getDashboardData().subscribe({

      next: (response: any) => {

        console.log('DASHBOARD RESPONSE:', response);

        this.dashboardData.set(response);

        const statusCounts =
          response.statusCounts || {};

        const total =
          (statusCounts.Open || 0) +
          (statusCounts['In Progress'] || 0) +
          (statusCounts.Resolved || 0) +
          (statusCounts.Closed || 0);

        this.totalTasks.set(total);

        console.log(
          'DASHBOARD DATA:',
          this.dashboardData()
        );

        console.log(
          'TOTAL TASKS:',
          this.totalTasks()
        );

      },

      error: (error: any) => {

        console.error('DASHBOARD ERROR:', error);

        this.errorMessage.set(
          error.error?.message ||
          'Failed to load dashboard'
        );

      },

    });

  }

}