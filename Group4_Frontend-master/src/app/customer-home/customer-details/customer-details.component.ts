import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { CustomerCart } from 'src/app/model/customerCart';


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  customer: Customer;
  errorMessage: string = "";
  successMessage: string = "";
  cartList: CustomerCart[] = []
  constructor() {

  }

  ngOnInit(): void {
    this.customer = JSON.parse(sessionStorage.getItem("customer") || "{}");

  }

  linkClick(value: string) {
    this.errorMessage = "";
    this.successMessage = "";
  }

}