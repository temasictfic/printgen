import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreditService {

  constructor() { }
  
  getCredit(): Observable<number> {
    return of(100); // TODO: of deprecated use scheduled if needed
  }

}
