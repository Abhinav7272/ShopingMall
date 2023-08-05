import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddCardService {

  constructor(private http:HttpClient) { }
  addNewCard(cardData:any,emailId: string): Observable<any>{
    let url:string = environment.cardAPIUrl+"/customer/"+emailId+"/cards";
    cardData["customerEmailId"]=emailId;
    console.log(cardData)
    return this.http.post(url,cardData,{responseType: 'text'}).pipe(catchError(this.handleError))
    //return this.http.post<any>(url,cardData);

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
