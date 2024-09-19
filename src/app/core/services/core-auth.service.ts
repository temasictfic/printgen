export interface CoreAuth {}
import {
  afterNextRender,
  Inject,
  Injectable,
  PLATFORM_ID,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AccessTokenPayload } from '../models/access-token-payload.';
import { LoggedUser } from '../models/logged-user';
import { RegisteredUser } from '../models/registered-user';
import e from 'express';

@Injectable({
  providedIn: 'root',
})
export class CoreAuthService {
  private _localStorage: Storage | undefined;
  private _token: string | null = null;
  private _expirationDate: string | null = null;
  private _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // BehaviorSubject: Subject sınıfının bir alt sınıfıdır. BehaviorSubject, bir başlangıç değeri alır ve bu değeri subscribe olan dinleyicilere hemen iletir. Daha sonra yeni değerler geldiğinde bu değerleri dinleyicilere iletir.

  public get isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }


  constructor(@Inject(DOCUMENT) protected document: Document) {
    afterNextRender(() => {
      this._localStorage =
        this.document?.defaultView?.localStorage || window.localStorage;
      this._token = this._localStorage?.getItem('access_token') ?? null;
      this._expirationDate = this._localStorage?.getItem('expiration_date') ?? null;
      if (this._token && !this.isTokenExpired(this._expirationDate)) this._isAuthenticated.next(true);
    });
  }

  protected get localStorage(): Storage | undefined {
    return this._localStorage;
  }

  public get tokenPayload(): AccessTokenPayload | null {
    if (!this.token) return null;

    const encodedPayload = this.token.split('.')[1];
    const decodedPayload = atob(encodedPayload);
    const retrievePayload = JSON.parse(decodedPayload) as AccessTokenPayload;

    this.payload = retrievePayload;
    return retrievePayload;
  }

  isTokenExpired(expirationDate: string | null): boolean {
    // Implement logic to check if the current token is expired
    if (!expirationDate) return true;
    return new Date() > new Date(expirationDate);
  }


  public get isAdministrator(): boolean {
    if (!this.isAuthenticated) return false;

    const tokenRole =
      this.payload?.[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];
    if (tokenRole?.includes('Admin')) {
      return true;
    }
    return false;
  }

  public isAuthorized(roles: string[]): boolean {
    return (
      this.isAuthenticated &&
      roles.some((role) =>
        this.payload?.[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ]?.includes(role)
      )
    );
  }

  public loginHandler(loggedUser: LoggedUser): void {
    this.token = loggedUser.token;
    this.expirationDate = loggedUser.expirationDate;
    this._isAuthenticated.next(true);
  }

  public logoutHandler(): void {
    this.localStorage?.removeItem('access_token');
    this.localStorage?.removeItem('expiration_date');
    this._isAuthenticated.next(false);
  }

  public registerHandler(registeredUser: RegisteredUser): void {
    this.token = registeredUser.token;
    this.expirationDate = registeredUser.expirationDate;
  }

  public get token(): string | null {
    return this._token;
  }

  protected set token(token: string | null) {
    if (token) {
      this._localStorage?.setItem('access_token', token);
    } else {
      this._localStorage?.removeItem('access_token');
    }
    this._token = token;
  }

  public get expirationDate(): string | null {
    console.log('expirationDate:', this._expirationDate);
    return this._expirationDate;
  }

  protected set expirationDate(date: string | null) {
    if (date) {
      this._localStorage?.setItem('expiration_date', date);
    } else {
      this._localStorage?.removeItem('expiration_date');
    }
    this._expirationDate = date;
  }

  private _payload: AccessTokenPayload | null = null;
  public get payload(): AccessTokenPayload | null {
    return this._payload;
  }

  protected set payload(value: AccessTokenPayload | null) {
    this._payload = value;
  }

  // refresh_token renewal made by backend
  public get refreshToken(): string | null {
    const name = 'refresh_token=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }
}
