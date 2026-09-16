import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

// frontend/
// │
// ├── src/
// │   ├── app/
// │   │   ├── components/
// │   │   │   ├── navbar/
// │   │   │   ├── dashboard/
// │   │   │   ├── task-list/
// │   │   │   ├── task-form/
// │   │   │   └── task-detail/
// │   │   │
// │   │   ├── pages/
// │   │   │   ├── login/
// │   │   │   └── register/
// │   │   │
// │   │   ├── services/
// │   │   │   ├── auth.service.ts
// │   │   │   └── task.service.ts
// │   │   │
// │   │   ├── guards/
// │   │   │   └── auth.guard.ts
// │   │   │
// │   │   └── interceptors/
// │   │       └── auth.interceptor.ts
// │   │
// │   └── ...
// │
// └── package.json  
