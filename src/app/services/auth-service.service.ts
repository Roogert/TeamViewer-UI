import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) {
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
          this.cookie.set('token', response.token);
          this.loggedIn.next(true);
          this.router.navigate(['']);
        })
      );
  }

  logout() {
    this.cookie.delete('token');
    this.loggedIn.next(false);
    this.router.navigate(['']);
  }
}
