import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  name: string = '';
  email: string = '';
  password: string = '';

  onSubmit() {
    console.log('Name:', this.name);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }

}
