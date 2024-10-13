import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    ReactiveFormsModule,
    FormGroup,
    provideRouter(routes),
    ...appConfig.providers  // Combina proveedores de appConfig
  ]
})
  .catch((err) => console.error(err));
