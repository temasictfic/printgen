import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroment/enviroment.prod';
import { Observable, Subject, tap } from 'rxjs';
import { TShirt } from '../models/t-shirt';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlacementService {

  private apiControllerUrl = `${environment.apiUrl}/api/catalogproduct`;
  private _tshirtDetails = new Subject<TShirt>();

  constructor(private http: HttpClient) { }

  get tshirtDetails(): Observable<TShirt> {
    return this._tshirtDetails.asObservable();
  }

  getTShirtDetails(id: number, color: string, placement: string): Observable<TShirt> {
      const params = new HttpParams().set('colors', color).set('placement', placement); // Use HttpParams to add query parameters
      return this.http.get<TShirt>(`${this.apiControllerUrl}/` + id + "/images", {
        params: params // Attach as a query parameter
      }).pipe(
        tap((tshirtDetails) => {
          this._tshirtDetails.next(tshirtDetails);
        })
      );
    }

}
