import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

interface LoginResponse {
  token: string;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
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
  private baseApiUrl = environment.apiUrl;
  private apiAuthUrl = `${this.baseApiUrl}/auth/login`;
  private apiSignupUrl = `${this.baseApiUrl}/users`;

  constructor(private http: HttpClient, private cookie: CookieService) {
    const token = this.cookie.get('token');
    if (token) {
      this.loggedIn.next(true);
    }
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  //allows access to authorization token :D
  getToken(): string {
    return this.cookie.get('token');
  }

  getCurrentUser(): User | null {
    const user = this.cookie.get('user');
    return user ? JSON.parse(user) : null;
  }

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${this.apiAuthUrl}`, {
        email,
        password,
      })
      .pipe(
        tap((response: any) => {
          this.cookie.set('token', response.token);
          this.cookie.set('user', JSON.stringify(response.user)); // Store user data in a cookie to access laterz
          this.loggedIn.next(true);
          location.reload();
        })
      );
  }

  logout() {
    this.cookie.delete('token');
    this.cookie.delete('user'); // Delete user data
    this.loggedIn.next(false);
    location.reload();
  }

  signUp(user: User) {
    return this.http.post(`${this.apiSignupUrl}`, user).pipe(
      tap({
        next: (response) => {
          // User created successfully

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
