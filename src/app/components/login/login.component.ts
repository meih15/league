import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';
  messageType: 'success' | 'error' = 'error';

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  login(): void {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.message = 'Login successful!';
        this.messageType = 'success';
        setTimeout(() => {
          this.router.navigate(['/']); 
        }, 1000);
      },
      error: (error: any) => {
        this.message = 'Login failed. Please check your credentials.';
        this.messageType = 'error';
        console.error('Login error:', error);
      }
    });
  }
}
