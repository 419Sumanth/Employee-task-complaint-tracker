import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { User } from '../../services/user';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.html',
  styleUrl: './create-user.css',
})
export class CreateUser {
  private fb = inject(FormBuilder);
  private userService = inject(User);
  private router = inject(Router);

  errorMessage = '';
  successMessage = '';
  submitting = false;

  userForm = this.fb.group({
    name: ['', [Validators.required]],

    email: [
      '',
      [
        Validators.required,
        Validators.email,
      ],
    ],

    mobile: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ],
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
      ],
    ],

    role: [
      'employee',
      Validators.required,
    ],
  });

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const userData = this.userForm.value;

    this.userService.createUser(userData).subscribe({
      next: (response: any) => {
        console.log('USER CREATED:', response);

        this.successMessage =
          'User created successfully';

        this.submitting = false;

        this.userForm.reset({
          role: 'employee',
        });

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      },

      error: (error: any) => {
        console.error('CREATE USER ERROR:', error);

        this.errorMessage =
          error.error?.message ||
          'Failed to create user';

        this.submitting = false;
      },
    });
  }
}