/*import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));*/

  import { bootstrapApplication } from '@angular/platform-browser';
  import { provideHttpClient } from '@angular/common/http';
  import { provideRouter } from '@angular/router';
  import { routes } from './app/app.routes';
  import { AppComponent } from './app/app.component';
   
  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes),
      provideHttpClient()  // ✅ Adds HttpClient support
    ]
  }).catch(err => console.error(err));
