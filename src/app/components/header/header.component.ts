import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getAuthState().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  signIn() {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
    } else {

      alert('You are already signed in.');
      this.router.navigate(['/']);
    }
  }

  signOut() {
    if (this.isAuthenticated) {
      this.authService.logout();
      this.router.navigate(['/login']);
    } else {
      alert('You are not signed in.');
    }
  }
}
