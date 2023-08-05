import { Component, OnInit } from '@angular/core';
import { PlaceOrderService } from './place-order.service';
import { Router } from '@angular/router';
import { Card } from 'src/app/model/card';
import { CustomerHomeService } from '../customer-home.service';
import { CustomerHomeComponent } from '../customer-home.component';


@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  cart: any;
  grandTotal: any = 0;
  cardType1: string = "DEBIT_CARD";
  cardType2: string = "CREDIT_CARD";
  cardList1: Card[] = [];
  cardList2: Card[] = [];
  selectedCard: Card;
  viewCardDetails: boolean = false;
  successMessage: any;
  errorMessage: any;
  loggedInCustomer: any;
  selectedI1: any = null;
  selectedI2: any = null;
  cvvg: any = null;
  orderId: any = null;
  showError: any;
  details1: any;
  details2: any;
  date: Date;
  confirmOrder1: boolean = false;
  confirmOrder2: boolean = false;
  popup: boolean = false;


  constructor(private router: Router, private customerhome:CustomerHomeComponent, private placeOrderSerivce: PlaceOrderService, private customerHomeService: CustomerHomeService) {

  }

  ngOnInit(): void {

    this.selectedI1 = null;
    this.selectedI2 = null;
    this.confirmOrder1 = false;
    this.confirmOrder2 = false;
    this.cart = JSON.parse(sessionStorage.getItem("cart") || "{}");
    this.cart.forEach((element: { product: { price: number; discount: number; }; quantity: number; }) => {
      this.grandTotal += (element.product.price -
        (element.product.price * 0 ) / 100) * element.quantity;
    });

    this.loggedInCustomer = JSON.parse(sessionStorage.getItem("customer") || "{}");
    
    
    this.placeOrderSerivce.getCards(this.loggedInCustomer.emailId, this.cardType1).subscribe(
      card1 => {
        this.cardList1 = card1;
        sessionStorage.setItem("card1", JSON.stringify(this.cardList1));
        this.customerHomeService.updateCardList(this.cardList1)
      }, err => {
        this.customerHomeService.updatedCardList.subscribe(cardList1 => this.cardList1 = cardList1)
      }
    )

    this.placeOrderSerivce.getCards(this.loggedInCustomer.emailId, this.cardType2).subscribe(
      card2 => {
        this.cardList2 = card2;
        sessionStorage.setItem("card1", JSON.stringify(this.cardList2));
        this.customerHomeService.updateCardList(this.cardList2)
      }, err => {
        this.customerHomeService.updatedCardList.subscribe(cardList2 => this.cardList2 = cardList2)
      }
    )
  }

  selectExistingCards1(i1: any) {
    this.selectedI1 = i1;
    this.selectedI2 = null;
    this.cvvg = null;
    this.orderId = null;
    this.successMessage = "";
    this.errorMessage = "";
  }

  selectExistingCards2(i2: any) {
    this.selectedI1 = null;
    this.selectedI2 = i2;
    this.cvvg = null;
    this.orderId = null;
    this.successMessage = "";
    this.errorMessage = "";
  }

  validation() {
    this.successMessage = "";
    this.errorMessage = "";
    if (this.cvvg > 999 || this.cvvg < 100) {
      this.showError = "CVV should be of 3 digit";
    }
    else if (this.cvvg == null) {
      this.showError = "Required";
    }
    else {
      this.showError = null;
    }
  }


  placeOrder(card: Card) {
    this.successMessage = "";
    this.errorMessage = "";

    let date1 = new Date();
    date1.setDate(date1.getDate() + 7);
    this.date = date1;

   let cardDiscount : number = (card.cardType=='DEBIT_CARD')?5:10;
   this.grandTotal = 0 ;
    this.cart.forEach((element: { product: { price: number; discount: number; }; quantity: number; }) => {
      this.grandTotal += (element.product.price -
        (element.product.price * cardDiscount ) / 100) * element.quantity;
    });

    this.details1 = {
      customerEmailId: this.loggedInCustomer.emailId,
      dateOfOrder: new Date(),
      totalPrice: this.grandTotal,
      orderStatus: "PLACED",
      discount: 0,
      paymentThrough: card.cardType,
      dateOfDelivery: date1,
      deliveryAddress: this.loggedInCustomer.deliveryAddress
    };
    console.log(this.details1);
    this.placeOrderSerivce.placeOrder(this.details1)
      .subscribe(
        success => {
          this.successMessage = success;

        },
        error => {
          this.errorMessage = error.error.errorMessage;
          console.log(error);
        });
  }



  // write a method to make the payment using the selected card 
  // by calling the payForOrder() of PlaceOrderService
  // and set the appropriate success or error message
  makePayment(card: Card) {
    this.successMessage=" "
    this.errorMessage=""
    this.placeOrderSerivce.payForOrder(this.loggedInCustomer.emailId,this.orderId,card , this.cvvg).subscribe(
      success => {
        this.successMessage = success;
        this.customerHomeService.updateCardList([]);
        sessionStorage.setItem("cart",JSON.stringify([]));
        // this.customerhome.cart=[];
      },
      error => {
        this.errorMessage = error.error.errorMessage;
        console.log(error);
      });
  }

  addCard() {
    this.router.navigate(["/home/card"]);
  }

  goToOrders() {
    this.router.navigate(["home/viewOrder"]);
  }

}
