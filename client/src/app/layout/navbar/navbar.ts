import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  private authService = inject(Auth);
  private router = inject(Router);

  user = signal<any>(null);

  ngOnInit() {
    this.authService.getCurrentUser().subscribe({
      next: (response) => {
        this.user.set(response.user);
      },
      error: (error) => {
        console.error('Failed to get current user:', error);
      },
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}