import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideSweetAlert2 } from '@sweetalert2/ngx-sweetalert2';

import { routes } from './app.routes';
import { jwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { authErrorInterceptor } from './shared/interceptors/auth-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideSweetAlert2(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor, authErrorInterceptor]))
  ]
};
