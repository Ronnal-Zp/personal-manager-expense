import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
  host: { class: 'flex min-h-dvh w-full items-center justify-center bg-gray-50' },
})
export class LoginPage implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly loading = signal(false);

  formLogin = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/inicio');
    }
  }

  onLogin(): void {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const { username, password } = this.formLogin.getRawValue();

    this.authService.login({ username: username!, password: password! }).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.authService.setToken(response.token);
        this.router.navigateByUrl('/inicio');
      },
      error: (err: any) => {
        this.loading.set(false);
        Swal.fire({
          title: '¡Ha ocurrido un error!',
          text: err.error?.message ?? 'Usuario o contraseña incorrectos.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      },
    });
  }
}
