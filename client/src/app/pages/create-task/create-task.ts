import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { Task } from '../../services/task';

@Component({
  selector: 'app-create-task',
  imports: [ReactiveFormsModule],
  templateUrl: './create-task.html',
  styleUrl: './create-task.css',
})
export class CreateTask {
  private fb = inject(FormBuilder);
  private taskService = inject(Task);
  private router = inject(Router);

  errorMessage = '';
  successMessage = '';
  submitting = false;

  taskForm = this.fb.group({
    title: [
      '',
      [
        Validators.required,
      ],
    ],

    description: [
      '',
      [
        Validators.required,
      ],
    ],

    category: [
      '',
      [
        Validators.required,
      ],
    ],

    priority: [
      'Medium',
      [
        Validators.required,
      ],
    ],
  });

  onSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const taskData = this.taskForm.value;

    this.taskService.createTask(taskData).subscribe({
      next: (response: any) => {
        console.log('TASK CREATED:', response);

        this.successMessage = 'Task created successfully';
        this.submitting = false;

        setTimeout(() => {
          this.router.navigate(['/tasks']);
        }, 1000);
      },

      error: (error: any) => {
        console.error('CREATE TASK ERROR:', error);

        this.errorMessage =
          error.error?.message || 'Failed to create task';

        this.submitting = false;
      },
    });
  }
}