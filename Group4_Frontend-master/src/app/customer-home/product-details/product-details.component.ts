import { Component, OnInit, Input } from '@angular/core';
import { CartProduct } from 'src/app/model/cartProduct';
import { Customer } from 'src/app/model/customer';
import { CustomerCart } from 'src/app/model/customerCart';
import { Product } from 'src/app/model/product';
import { CustomerCartService } from '../customer-cart/customer-cart.service';
import { CustomerHomeComponent } from '../customer-home.component';
import { CustomerHomeService } from '../customer-home.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html'
})

export class ProductDetailsComponent implements OnInit {

    @Input()
    selectedProduct: Product;
    errorMessage: string;
    successMessage: string;
    cartList: CustomerCart[] = [];

    constructor(private customerCommonService: CustomerHomeService, private custHome: CustomerHomeComponent) { }

    ngOnInit(): void {
    }

    addToCart() {
        this.successMessage = "";
        this.errorMessage = "";

        let cart: CustomerCart[] = JSON.parse(sessionStorage.getItem("cart") || "{}");;
        if (cart == null) {
            cart = [];
        }

        let cartToAdd: CustomerCart = new CustomerCart();

        let customer: Customer = JSON.parse(sessionStorage.getItem("customer") || "{}");
        cartToAdd.customerEmailId = customer.emailId

        cartToAdd.product = this.selectedProduct;

        let cartProd: CartProduct = new CartProduct();
        let prod: Product = new Product();
        prod.productId = this.selectedProduct.productId;
        cartProd.product = prod;
        cartProd.quantity = 1;

        cartToAdd.cartProducts = [cartProd];

        cartToAdd.quantity = 1;

        let alreadyAddedToCart: boolean = (cart.filter(c => c.product.productId == this.selectedProduct.productId)).length != 0;

        if (alreadyAddedToCart) {
            this.errorMessage = "Already added to Cart. Go to cart for modifying your selection."
            Swal.fire(this.errorMessage);
        }
        else {
            
            //add the selected item to the cart by calling addProductToCart() of CustomerHomeService,
            //set the success and error message appropriately
            cart.push(cartToAdd);
            this.customerCommonService.updateCartList(cart)
            sessionStorage.setItem("cart", JSON.stringify(cart));
            this.customerCommonService.addProductToCart(cartToAdd).subscribe((response)=>{
                this.successMessage=response;
                Swal.fire(this.successMessage);
            }, (error)=>{
                this.errorMessage = error;
                Swal.fire(this.errorMessage);

            })
            
        }
    }
}
