import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../services/user';
import { Task } from '../../services/task';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-task-detail',
  imports: [DatePipe,FormsModule],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css',
})
export class TaskDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private taskService = inject(Task);
  private userService = inject(User);
  private authService = inject(Auth);

  user = this.authService.getUser();

  task = signal<any>(null);
  staffMembers = signal<any[]>([]);

  loading = signal(true);
  errorMessage = signal('');

  commentMessage = '';
  commentLoading = signal(false);
  commentError = signal('');

  selectedStaffId = '';
  assignLoading = signal(false);
  assignError = signal('');
  assignSuccess = signal('');

  selectedStatus = '';
  statusLoading = signal(false);
  statusError = signal('');
  statusSuccess = signal('');

   isAdmin() {
  return this.user?.role === 'admin';
  }

  canUpdateStatus() {
    return (
     this.user?.role === 'admin' ||
     this.user?.role === 'staff'
    );
  }

ngOnInit() {
  const taskId = this.route.snapshot.paramMap.get('id');

  if (!taskId) {
    this.errorMessage.set('Task ID not found');
    this.loading.set(false);
    return;
  }

  this.loadTask(taskId);
  
  if (this.isAdmin()) {
  this.loadStaffMembers();
}
}

  loadTask(id: string) {
    this.taskService.getTaskById(id).subscribe({
      next: (response: any) => {
        console.log('TASK DETAIL RESPONSE:', response);

        this.task.set(response.task);
        this.loading.set(false);
      },

      error: (error: any) => {
        console.error('TASK DETAIL ERROR:', error);

        this.errorMessage.set(
          error.error?.message || 'Failed to load task'
        );

        this.loading.set(false);
      },
    });
  }

  loadStaffMembers() {
  this.userService.getStaffMembers().subscribe({
    next: (response: any) => {
      console.log('STAFF MEMBERS:', response);

      this.staffMembers.set(response.staff || []);
    },

    error: (error: any) => {
      console.error('STAFF MEMBERS ERROR:', error);
    },
  });
}

assignStaff() {
  const taskId = this.task()?._id;

  if (!taskId || !this.selectedStaffId) {
    return;
  }

  this.assignLoading.set(true);
  this.assignError.set('');
  this.assignSuccess.set('');

  this.taskService
    .assignTask(taskId, this.selectedStaffId)
    .subscribe({
      next: (response: any) => {
        console.log('TASK ASSIGNED:', response);

        this.assignSuccess.set(
          'Staff assigned successfully'
        );

        this.assignLoading.set(false);

        // Reload task to show the new assigned staff
        this.loadTask(taskId);
      },

      error: (error: any) => {
        console.error('ASSIGN STAFF ERROR:', error);

        this.assignError.set(
          error.error?.message ||
          'Failed to assign staff'
        );

        this.assignLoading.set(false);
      },
    });
}

    updateStatus() {
  const taskId = this.task()?._id;

  if (!taskId || !this.selectedStatus) {
    return;
  }

  this.statusLoading.set(true);
  this.statusError.set('');
  this.statusSuccess.set('');

  this.taskService
    .updateTaskStatus(taskId, this.selectedStatus)
    .subscribe({
      next: (response: any) => {
        console.log('STATUS UPDATED:', response);

        this.statusSuccess.set(
          'Task status updated successfully'
        );

        this.statusLoading.set(false);

        this.loadTask(taskId);
      },

      error: (error: any) => {
        console.error('STATUS UPDATE ERROR:', error);

        this.statusError.set(
          error.error?.message ||
          'Failed to update task status'
        );

        this.statusLoading.set(false);
      },
    });
}

  addComment() {
  const taskId = this.task()?._id;

  if (!taskId || !this.commentMessage.trim()) {
    return;
  }

  this.commentLoading.set(true);
  this.commentError.set('');

  this.taskService
    .addComment(taskId, this.commentMessage.trim())
    .subscribe({
      next: (response: any) => {
        console.log('COMMENT ADDED:', response);

        this.commentMessage = '';
        this.commentLoading.set(false);

        // Reload task to display the new comment
        this.loadTask(taskId);
      },

      error: (error: any) => {
        console.error('COMMENT ERROR:', error);

        this.commentError.set(
          error.error?.message || 'Failed to add comment'
        );

        this.commentLoading.set(false);
      },
    });
}
}