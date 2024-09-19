import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../../../shared/models/card.';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroment/enviroment.prod';
import { Filter } from '../../../shared/models/filter';


@Injectable({
  providedIn: 'root',
})
export class BestSellerService {
  private apiUrl = `${environment.apiUrl}/api/best-sellers`;

  filterEvent = new EventEmitter<Filter>();

  constructor(private http: HttpClient) {}

  getBestSellers(page: number, limit: number): Observable<Card[]> {
    return this.http.get<Card[]>(
      `${this.apiUrl}?_page=${page}&_limit=${limit}`
    );
  }
}
