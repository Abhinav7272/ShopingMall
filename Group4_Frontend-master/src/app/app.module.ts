import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EKartRoutingGuard } from './app.routing-guard';
import { AuthorisationErrorComponent } from './authorisation-error/authorisation-error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDescriptionPipe } from './pipes/product-description.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomerCartComponent } from './customer-home/customer-cart/customer-cart.component';
import { CustomerCartService } from './customer-home/customer-cart/customer-cart.service';
import { CustomerDetailsComponent } from './customer-home/customer-details/customer-details.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerHomeService } from './customer-home/customer-home.service';
import { PlaceOrderComponent } from './customer-home/place-order/place-order.component';
import { PlaceOrderService } from './customer-home/place-order/place-order.service';
import { ProductDetailsComponent } from './customer-home/product-details/product-details.component';
import { ViewAllProductsService } from './customer-home/view-all-products/view-all-product.service';
import { ViewAllProductsComponent } from './customer-home/view-all-products/view-all-products.component';
import { CustomerLandingPageComponent } from './customer-landing-page/customer-landing-page.component';
import { LoginComponent } from './customer-landing-page/login/login.component';
import { LoginService } from './customer-landing-page/login/login.service';
import { RegistrationComponent } from './customer-landing-page/registration/registration.component';
import { RegistrationService } from './customer-landing-page/registration/registration.service';
import { ViewOrderComponent } from './customer-home/view-order/view-order.component';
import { CardComponent } from './customer-home/place-order/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorisationErrorComponent,
    CustomerLandingPageComponent,
    LoginComponent,
    RegistrationComponent,
    CustomerHomeComponent,
    CustomerCartComponent,
    ViewAllProductsComponent,
    ProductDescriptionPipe,
    PlaceOrderComponent,
    CustomerDetailsComponent,
    ProductDetailsComponent,
    ViewOrderComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule

  ],
  providers: [EKartRoutingGuard,
    LoginService,
    RegistrationService,
    CustomerHomeService,
    CustomerCartService,
    ViewAllProductsService,
    PlaceOrderService],
  exports: [
    ProductDetailsComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

