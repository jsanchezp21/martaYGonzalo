import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../core/api.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  template: `
    <section class="container py-10">
      <div class="card max-w-xl mx-auto">
        <h1 class="font-display text-3xl mb-2 text-center">Acceso administrador</h1>
        <p class="text-grayText text-center mb-6">Introduce tus credenciales para entrar al panel.</p>

        <form (ngSubmit)="submit()" class="grid gap-3 justify-center">
          <input class="border rounded-xl px-3 py-2 w-80" [(ngModel)]="username" name="username" placeholder="Usuario" required>
          <input class="border rounded-xl px-3 py-2 w-80" [(ngModel)]="password" name="password" placeholder="Contraseña" type="password" required>
          <button class="btn btn-primary" [disabled]="loading">Entrar</button>
          <div class="text-red-600 text-sm text-center" *ngIf="error">{{error}}</div>
        </form>
      </div>
    </section>
  `
})
export class LoginPage {
  username = '';
  password = '';
  loading = false;
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  submit() {
    this.loading = true; this.error = '';
    this.api.adminLogin(this.username.trim(), this.password)
      .subscribe({
        next: (res) => {
          sessionStorage.setItem('adminToken', res.token);
          this.loading = false;
          this.router.navigateByUrl('/__admin');
        },
        error: (e) => {
          this.loading = false;
          this.error = e?.error?.message || 'Credenciales inválidas';
        }
      });
  }
}
