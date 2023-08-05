import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Customer } from "src/app/model/customer";
import { CustomerCart } from "src/app/model/customerCart";
import { CustomerHomeService } from "./customer-home.service";


@Component({
    selector: 'customer-home',
    templateUrl: './../customer-home/customer-home.component.html'

})
export class CustomerHomeComponent {
    isViewProductSelected: boolean = false;
    isRouting: boolean = false;
    optionSelected!: string;
    loggedInCustomer: Customer;
    searchText!: string;
    cart: CustomerCart[] = [];
    sStr: string = '';

    constructor(private router: Router,
        private customerHomeService: CustomerHomeService) {
        customerHomeService.loggedInCustomer.subscribe((custName) => {
            this.loggedInCustomer = custName
        })
    }

    ngOnInit() {

        this.getLoggedInCustomer();
        this.getCustomerCart();
    }
    getLoggedInCustomer() {


        let temp!: any;
        temp = sessionStorage.getItem('customer');
        this.customerHomeService.updatedCustomer()
    }

    getCustomerCart() {

        this.customerHomeService.updatedCartList.subscribe(cartList => this.cart = cartList)
        this.customerHomeService.getCustomerCart(this.loggedInCustomer.emailId).subscribe(
            cart => {
                this.cart = cart;
                sessionStorage.setItem("cart", JSON.stringify(this.cart));
                this.customerHomeService.updateCartList(this.cart)
            }, err => {
                this.cart = [];
                sessionStorage.setItem("cart", JSON.stringify(this.cart));
                this.customerHomeService.updateCartList(this.cart);
                this.customerHomeService.updatedCartList.subscribe(cartList => this.cart = cartList)
            }
        )
    }

    logout() {
        sessionStorage.clear();
        this.router.navigate([""])
    }
}