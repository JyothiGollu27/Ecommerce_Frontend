import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
  { path: 'products', component: ProductPageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'profile', component: ProfilePageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },

];
