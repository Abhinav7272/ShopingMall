import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Product } from 'src/app/model/product';


@Injectable({
  providedIn: 'root'
})
export class ViewAllProductsService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json',  'mode': 'no-cors' });
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {

    let url = environment.customerProductAPI + "/products";
    return this.http.get<Product[]>(url)
      .pipe(catchError(this.handleError));

  }

  private handleError(err: HttpErrorResponse) {
    console.log(err)
    let errMsg: string = '';
    if (err.error instanceof Error) {
      errMsg = err.error.message;
      console.log(errMsg)
    }
    else if (typeof err.error === 'string') {
      errMsg = JSON.parse(err.error).errorMessage
    }
    else {
      if (err.status == 0) {
        errMsg = "A connection to back end can not be established.";
      } else {
        errMsg = err.error.message;
      }
    }
    return throwError(errMsg);
  }
}
