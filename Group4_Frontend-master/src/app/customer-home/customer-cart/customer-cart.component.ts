import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerCart } from 'src/app/model/customerCart';
import { CustomerHomeService } from '../customer-home.service';
import { CustomerCartService } from './customer-cart.service';
import { Customer } from "src/app/model/customer";
import { parse } from 'path';
import { Product } from 'src/app/model/product';
import { CustomerHomeComponent } from '../customer-home.component';
// import { CustomerSharedService } from "../customer-shared-service";



@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css']
})
export class CustomerCartComponent implements OnInit {
  ProductID: number;
  cartList: CustomerCart[] = [];
  selectedCartProduct: CustomerCart;
  viewCartProductDetails: boolean = false;
  viewBilling:boolean=false;
  successMessage: string;
  errorMessage: string;
  loggedInCustomer: any;
  total:number;
  quantity:number; 
  flag: string="";

  constructor(private router: Router, private customerhome:CustomerHomeComponent, private customerCartService: CustomerCartService, private customerHomeService: CustomerHomeService) { }

  ngOnInit(): void {
    this.loggedInCustomer = JSON.parse(sessionStorage.getItem("customer") || "{}");
    this.getCustomerCart();
    this.viewCartProductDetails = false;
  }

  alter(operation: string, cart: CustomerCart) {
    if (operation == '-') cart.quantity--;
    else cart.quantity++;
    this.successMessage = "";
    this.errorMessage = "";
    if(cart.quantity<1){
      cart.quantity=1;
      this.flag = "Quantity less than 1 not allowed !"
    }
    else{
      this.flag="";
    }
    let loggedInCustomer: any = JSON.parse(sessionStorage.getItem("customer") || "{}");
    this.customerCartService.updateProductFromCart(cart, loggedInCustomer.emailId).subscribe(
      message => {
        this.getCustomerCart()
        if(this.flag!=""){
          this.successMessage = this.flag;

        }
        else{
          this.successMessage = message;

        }
      }, error => this.errorMessage = <any>error
    )
  }

  setSelectedCart(cart: CustomerCart) {
    this.successMessage = "";
    this.errorMessage = "";
    this.viewCartProductDetails = true;
    this.selectedCartProduct = cart;
  }

  getCustomerCart() {
    this.customerCartService.getCustomerCart(this.loggedInCustomer.emailId).subscribe(
      cart => {
        this.cartList = cart;
        sessionStorage.setItem("cart", JSON.stringify(this.cartList));
        this.customerHomeService.updateCartList(this.cartList)
      }, err => {
        this.customerHomeService.updatedCartList.subscribe(cartList => this.cartList = cartList)
      }
    )

  }

  setProductId(productId:number){
  this.ProductID=productId;
  }
  deleteProductFromCart(cart: CustomerCart) {
    this.customerCartService.deleteProductFromCart(cart,this.loggedInCustomer.emailId, cart.product.productId).subscribe(
        message => {
            this.cartList = this.cartList.filter(item => item.cartId !== cart.cartId);
            sessionStorage.setItem("cart", JSON.stringify(this.cartList));
            this.customerHomeService.updateCartList(this.cartList);
            this.successMessage = message;
            this.ngOnInit();
        }, error =>{ this.errorMessage = <any>error}
       
    )
    this.getCustomerCart();
  }
  placeOrder(cart: CustomerCart[]) {
    this.router.navigate(["/home/placeOrder"]);
  }
  continueShopping() {
    this.router.navigate(["/home/products"]);
  }
}