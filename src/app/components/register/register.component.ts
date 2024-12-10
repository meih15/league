import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  message: string = '';
  messageType: 'success' | 'error' = 'error';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        this.messageType = 'success';
        this.message = 'Registration successful!';
        setTimeout(() => {
          this.authService.login({ email: this.email, password: this.password }).subscribe({
            next: () => {
              this.messageType = 'success';
              this.message = 'You are now logged in!';
              setTimeout(() => {
                this.router.navigate(['/']); 
              }, 1000);
            },
            error: () => {
              this.messageType = 'error';
              this.message = 'Registration succeeded, but login failed. Please try logging in manually.';
            }
          });
        }, 1000);
      },
      error: (error) => {
        this.messageType = 'error';
        this.message = 'Registration failed. Please try again.';
      }
    });
  }
}
