import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Auth } from '../../services/auth';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private authService = inject(Auth);

  user = this.authService.getUser();

  isAdmin() {
    return this.user?.role === 'admin';
  }

  isEmployee() {
    return this.user?.role === 'employee';
  }
}