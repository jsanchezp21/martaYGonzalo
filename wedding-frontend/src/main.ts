import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { HomePage } from './app/pages/home.page';
import { AdminPage } from './app/pages/admin.page';
import { LoginPage } from './app/pages/login.page';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: '__', redirectTo: '__login', pathMatch: 'full' }, // atajo oculto
  { path: '__login', component: LoginPage },
  { path: '__admin', component: AdminPage },
  { path: '**', redirectTo: '' }
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()]
});
