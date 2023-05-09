import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>('TODO:"Update Routes"', {
        email,
        password,
      })
      .pipe(
        tap((response: any) => {
          this.cookie.set('token', response.payload.token.value);
          this.loggedIn.next(true);
          this.router.navigate(['/home']); // navigate to home page
        })
      );
  }

  logout() {
    this.cookie.delete('token');
    this.loggedIn.next(false);
    this.router.navigate(['']);
  }
}
