import { Injectable } from '@angular/core';
import { UserDetails } from '../models/UserDetails.';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../../../enviroment/enviroment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiControllerUrl = `${environment.apiUrl}/api/user`;
  private _userDetails = new Subject<UserDetails>();

  constructor(private http: HttpClient) { }

  get userDetails(): Observable<UserDetails> {
    return this._userDetails.asObservable();
  }

  getUserDetailsById(id: string): Observable<UserDetails> {
      //const params = new HttpParams().set('id', id); // Use HttpParams to add query parameters
      return this.http.get<UserDetails>(`${this.apiControllerUrl}/` + id
      ).pipe(
        tap((userDetails) => {
          this._userDetails.next(userDetails);
        })
      );
    }

}
