import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

interface LoginResponse {
  token: string;
}

interface User {
  first_name: string;
  last_name: string;
  password: string;
  email: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private cookie: CookieService) {
    const token = this.cookie.get('token');
    if (token) {
      this.loggedIn.next(true);
    }
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>('http://localhost:3000/auth/login', {
        email,
        password,
      })
      .pipe(
        tap((response: any) => {
          this.cookie.set('token', response.token); //creates a cookie instead of local storing
          this.loggedIn.next(true);
          location.reload();
        })
      );
  }

  logout() {
    this.cookie.delete('token');
    this.loggedIn.next(false);
    location.reload();
  }

  signUp(user: User) {
    return this.http.post('http://localhost:3000/users/create', user).pipe(
      tap({
        next: (response) => {
          // User created successfully
          console.log(response);
          location.reload(); // Refresh the page
        },
        error: (error) => {
          // Handle error
          console.error('Error creating user:', error);
        },
      })
    );
  }
}
