import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService) {}

  register(): void {
    this.authService.register({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        this.message = 'Registration successful!';
      },
      error: (error) => {
        this.message = 'Registration failed. Please try again.';
      }
    });
  }
}
