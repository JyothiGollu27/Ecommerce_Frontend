import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../pages/profile-page/User-model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://your-api-url.com/api/RegularUsers';

  constructor(private http: HttpClient) { }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.userId}`, user);
  }
}

