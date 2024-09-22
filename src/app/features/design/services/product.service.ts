import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Product } from '../models/product.';
import { environment } from '../../../../enviroment/enviroment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiControllerUrl = `${environment.apiUrl}/api/catalogproduct`;
  private _productDetails = new Subject<Product>();

  constructor(private http: HttpClient) { }

  get productDetails(): Observable<Product> {
    return this._productDetails.asObservable();
  }

  getProductDetails(id: number, sellingRegionName: string = "worldwide"): Observable<Product> {
      const params = new HttpParams().set('sellingRegionName', sellingRegionName); // Use HttpParams to add query parameters
      return this.http.get<Product>(`${this.apiControllerUrl}/` + id, {
        params: params // Attach as a query parameter
      }).pipe(
        tap((productDetails) => {
          this._productDetails.next(productDetails);
        })
      );
    }
}
