import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ViewAllProductsService } from './view-all-product.service';


@Component({
  selector: 'app-view-all-products',
  templateUrl: './view-all-products.component.html',
  styleUrls: ['./view-all-products.component.css']
})
export class ViewAllProductsComponent implements OnInit {

  successMessage: string;
  errorMessage: string;
  productList: Product[];

  searchText: string;

  viewDetails: boolean = false;
  selectedProduct: Product;

  productListToDisplay: Product[] = [];
  constructor(private viewAllProductService: ViewAllProductsService) {


  }

  ngOnInit() {
    this.getAllProduct();
  }
  getAllProduct() {
    this.viewAllProductService.getAllProducts()
      .subscribe(products => {
        this.productList = products;
        this.productListToDisplay = this.productList;
      }
      );


  }
  setSelectedProduct(product: Product) {
    this.viewDetails = true;
    this.selectedProduct = product;
  }




  search() {
    this.searchText = this.searchText.toLowerCase()
    if (this.searchText) {
      this.productListToDisplay = this.productList.filter(product => {
        return product.brand.toLowerCase().indexOf(this.searchText) != -1 || product.name.toLowerCase().indexOf(this.searchText) != -1
      });
    } else {
      this.productListToDisplay = this.productList;
    }

  }

  clear() {
    this.productListToDisplay = this.productList;
    this.searchText = "";
  }


}
