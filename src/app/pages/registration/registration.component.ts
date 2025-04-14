import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router ,RouterModule} from '@angular/router';
import { AuthService ,User} from '../../services/auth.service';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  onSubmit() {
    const user: User = {
      UserName: this.name,
      Email: this.email,
      Password: this.password
    };

    this.authService.register(user).subscribe(
      response => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']); 
      },
      error => {
        console.error('Registration failed', error);
      }
    );

    
  }
}
