import { Routes } from '@angular/router';


import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Tasks } from './pages/tasks/tasks';
import { MainLayout } from './layout/main-layout/main-layout';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard'
import { TaskDetail } from './pages/task-detail/task-detail';
import { CreateTask } from './pages/create-task/create-task';
import { CreateUser } from './pages/create-user/create-user';

export const routes: Routes = [
  // Public route
  {
    path: 'login',
    component: Login,
  },

  // Protected application layout
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },

      {
        path: 'tasks',
        component: Tasks,
      },

      {
        path: 'tasks/create',
        component: CreateTask,
      },

      {
        path: 'users/create',
        component: CreateUser,
        canActivate: [adminGuard],
      },

      {
        path: 'tasks/:id',
        component: TaskDetail,
      },
    ],
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];