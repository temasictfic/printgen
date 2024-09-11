import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import { CoreAuthService } from './core-auth.service';
import { environment } from '../../../enviroment/enviroment.prod';
import { RegisterCredentials } from '../models/register-credentials';
import { LoginCredentials } from '../models/login-credentials';
import { LoggedUser } from '../models/logged-user';
import { RegisteredUser } from '../models/registered-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends CoreAuthService {
  private apiControllerUrl = `${environment.apiUrl}/api/auth`;
  loginSuccess = new EventEmitter<void>();

  constructor(private http: HttpClient, @Inject(DOCUMENT) document: Document) {
    super(document);
  }

  emitLoginSuccess(): void {
    this.loginSuccess.emit();
  }

  login(loginCredentials: LoginCredentials): Observable<LoggedUser> {
    return this.http
      .post<LoggedUser>(`${this.apiControllerUrl}/login`, loginCredentials)
      .pipe(
        tap((loggedUser) => {
          super.loginHandler(loggedUser);
        })
      );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiControllerUrl}/logout`, {}).pipe(
      tap(() => {
        super.logoutHandler();
      })
    );
  }

  register(
    registerCredentials: RegisterCredentials
  ): Observable<RegisteredUser> {
    return this.http
      .post<RegisteredUser>(
        `${this.apiControllerUrl}/register`,
        registerCredentials
      )
      .pipe(
        tap((registeredUser) => {
            super.registerHandler(registeredUser);
        })
      );
  }


  // Method to refresh the access token using the refresh_token
  refreshAccessToken(): Observable<any> {
    return this.http
      .post<any>(`${this.apiControllerUrl}/refresh-token`, {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap((payload) => {
          this.token = payload.access_token;
          this.expirationDate = payload.expiration_date;
        })
      );
  }
}
