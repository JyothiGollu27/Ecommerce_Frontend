import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [AuthService],
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  emailError: string = '';
  passwordError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.login({ email: this.email, password: this.password }).subscribe(
        response => {
          this.authService.saveToken(response.token);
          console.log('Login successful', response);
          this.errorMessage = '';
          this.router.navigate(['/products']);
        },
        error => {
          console.error('Login failed', error);
          this.errorMessage = 'Invalid email or password';
        }
      );
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}