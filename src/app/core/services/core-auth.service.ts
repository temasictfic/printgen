export interface CoreAuth { }
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { AccessTokenPayload } from '../models/access-token-payload.';
import { LoggedUser } from '../models/logged-user';
import { RegisteredUser } from '../models/registered-user';
import e from 'express';

@Injectable({
  providedIn: 'root',
})
export class CoreAuthService {

  // Subject: TS tarafında bir Observable'dır. Bu nedenle Subject sınıfı, Observable sınıfının bir alt sınıfıdır. Subject'e subscribe olan dinleyiciler sonraki çağrıları -next, error, complete- yakalabilirler ve eğer bir değer de geçiliyorsa next çağrısından sonra bu değeri alabilirler.
  protected readonly _logged = new Subject<void>();

  public get logged(): Observable<void> {
    return this._logged.asObservable();
  }

  // BehaviorSubject: Subject sınıfının bir alt sınıfıdır. BehaviorSubject, bir başlangıç değeri alır ve bu değeri subscribe olan dinleyicilere hemen iletir. Daha sonra yeni değerler geldiğinde bu değerleri dinleyicilere iletir.
  protected readonly _isLogged = new BehaviorSubject<boolean>(
    this.isAuthenticated
  );
  public get isLogged(): Observable<boolean> {
    return this._isLogged.asObservable();
  }

  protected readonly _registered = new Subject<void>();
  public get registered(): Observable<void> {
    return this._registered.asObservable();
  }

  protected readonly _isRegistered = new BehaviorSubject<boolean>(
    this.isAuthenticated
  );

  public get isRegistered(): Observable<boolean> {
    return this._isRegistered.asObservable();
  }


  constructor(@Inject(DOCUMENT) protected document: Document) {}


  protected get localStorage(): Storage | undefined {

    return this.document?.defaultView?.localStorage;
  }

  public get tokenPayload(): AccessTokenPayload | null {
    if (!this.token) return null;

    const encodedPayload = this.token.split('.')[1];
    const decodedPayload = atob(encodedPayload);
    const payload = JSON.parse(decodedPayload) as AccessTokenPayload;

    this.payload = payload;
    return payload;
  }

  isTokenExpired(): boolean {
    // Implement logic to check if the current token is expired
    if (!this.expirationDate) return true;
    return new Date() > new Date(this.expirationDate);
  }

  public get isAuthenticated(): boolean {
    return !!this.token && !this.isTokenExpired();
  }

  public get isAdministrator(): boolean {
    if (!this.isAuthenticated) return false;

    const tokenRole = this.payload?.role;
    if (tokenRole?.includes('Admin')) {
      return true;
    }
    return false;
  }

  public isAuthorized(roles: string[]): boolean {
    return this.isAuthenticated && roles.some(role => this.payload?.role?.includes(role));
  }

  public loginHandler(loggedUser: LoggedUser): void {
    this.token = loggedUser.token;
    this.expirationDate = loggedUser.expirationDate;
    this._logged.next();
    this._isLogged.next(true);
  }

  public logoutHandler(): void {
    this.localStorage?.removeItem('access_token');
    this.localStorage?.removeItem('expiration_date');
    this._logged.next();
    this._isLogged.next(false);
  }

  public registerHandler(registeredUser: RegisteredUser): void {
    this.token = registeredUser.token;
    this.expirationDate = registeredUser.expirationDate;
    this._registered.next();
    this._isRegistered.next(true);
  }

  public get token(): string | null {
    return this.localStorage?.getItem('access_token') ?? null;
  }

  protected set token(token: string) {
    this.localStorage?.setItem('access_token', token);
  }

  public get expirationDate(): number | null {
    return Number(this.localStorage?.getItem('expiration_date')) ?? null;
  }

  protected set expirationDate(date: number) {
    this.localStorage?.setItem('expiration_date', String(date));
  }

  public get payload(): AccessTokenPayload | null {
    return this.payload;
  }

  protected set payload(payload: AccessTokenPayload | null) {
    this.payload = payload;
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