import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        this.authService.saveToken(response.access_token);
        this.message = 'Login successful!';
        setTimeout(() => {
          this.router.navigate(['/']); // Redirect to home page
        }, 1000);
      },
      error: (error) => {
        this.message = 'Login failed. Please check your credentials.';
      }
    });
  }
}

