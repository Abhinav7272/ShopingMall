import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from "../../environments/environment";
import { catchError } from 'rxjs/operators';
import { CustomerCart } from "src/app/model/customerCart";
import { Card } from "src/app/model/card";
import { Customer } from "src/app/model/customer";




@Injectable({
    providedIn: 'root'
})
export class CustomerHomeService {
    temp!: any;
    constructor(private http: HttpClient) {
        this.temp = JSON.stringify(sessionStorage.getItem('customer'));
    }

    private cartList = new Subject<CustomerCart[]>();
    updatedCartList = this.cartList.asObservable();

    private cardList = new Subject<Card[]>();
    updatedCardList = this.cardList.asObservable();

    customerdata: Customer;

    public loggedInCustomer = new Subject<Customer>();

    updatedCustomer() {
        let customerData: any = sessionStorage.getItem('customer');
        customerData = JSON.parse(customerData)
        this.loggedInCustomer.next(customerData)
    }

    updatedCustomerDetails(customer: Customer) {
        this.loggedInCustomer.next(customer);
    }

    updateCartList(cartList: CustomerCart[]) {
        this.cartList.next(cartList);
    }

    updateCardList(cardList: Card[]) {
        this.cardList.next(cardList);
    }

    // addProductToCart(cart: CustomerCart) {
    //     return this.http.post(environment.customerCartUrl+"/addProductToCart/"+cart.customerEmailId, cart, {responseType: "text"})
    //     .pipe(catchError(this.handleError))
    // }
    addProductToCart(cart: CustomerCart) {
        return this.http.post(environment.customerCartUrl+"/products", cart, {responseType: "text"})
        .pipe(catchError(this.handleError))
    }

    getCustomerCart(emailId: string): Observable<CustomerCart[]> {
        let url: string = environment.customerCartUrl + "/customer/" + emailId + "/products";
        return this.http.get<CustomerCart[]>(url)
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