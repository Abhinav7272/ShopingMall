import { Component, OnInit } from '@angular/core';
import { ViewOrderService } from './view-order.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html'
})
export class ViewOrderComponent implements OnInit {

  p: number = 1;
  loggedInCustomer: any;
  successMessage: any = null;
  errorMessage: any = null;
  orders: any[];

  constructor(private service: ViewOrderService) {
    this.loggedInCustomer = JSON.parse(sessionStorage.getItem("customer") || "{}");
  }
  ngOnInit(): void {
    this.service.getOrders(this.loggedInCustomer.emailId).subscribe(
      success => this.orders = success,
      error => this.errorMessage = error
    )
  }

}
