import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-page',
  standalone:true,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  email!: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
   var token= this.authService.getDecodedToken();
   //console.log(token);
   if(token!=null)
   {
    this.email=token.email;
   }
    }
  

  navigateToProducts() {
    this.router.navigate(['/products']);
  }
}