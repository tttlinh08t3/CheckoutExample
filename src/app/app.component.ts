import { Component, OnInit } from '@angular/core';

import { ProductDetail } from './model/product-detail.model';
import { ProductCart, Checkout } from './model/product-checkout.model';
import { ProductsCheckoutService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public productList: ProductDetail[] = new Array<ProductDetail>();
  public checkout: Checkout = new Checkout(new Array<ProductCart>());
  public customers: string [] = new Array<string>();
  public selectedCustomer = '';

  constructor(private checkoutService: ProductsCheckoutService) {
    this.productList = this.checkoutService.getProducts();
    this.customers= this.checkoutService.getCustomers();
  }
 
  ngOnInit(){}
  
  addItem(productCart: ProductCart) {
    this.updateProductCart(productCart);
  }
  
  removeItem(productCart: ProductCart) {
    let index = this.checkout.productsToCheckout.indexOf(productCart);
    if(index != -1) {
      this.checkout.productsToCheckout.splice(index,1);
      this.checkoutService.updateProductsCheckout(this.checkout, this.selectedCustomer);
    } 
  }

  onChangeCustomer(customer: string){
    this.selectedCustomer = customer;
    this.checkoutService.updateProductsCheckout(this.checkout, this.selectedCustomer);
  }

  plusQuantity(productCart: ProductCart) {
    productCart.quantity ++;
    this.checkoutService.updateProductsCheckout(this.checkout, this.selectedCustomer);
  }
  minusQuantity (productCart: ProductCart) {
    if(productCart.quantity > 1) {
      productCart.quantity --;
      this.checkoutService.updateProductsCheckout(this.checkout, this.selectedCustomer);
    }
  }

  updateProductCart(productCart: ProductCart){
    let updateProductCart = this.checkout.productsToCheckout.find(p => p.item.id == productCart.item.id);
    let index = this.checkout.productsToCheckout.indexOf(updateProductCart);
    if(updateProductCart && index != -1) {
      updateProductCart.quantity ++;
      this.checkout.productsToCheckout[index] = updateProductCart;  
    }
    else {
      this.checkout.productsToCheckout.push(productCart);
    }
    this.checkoutService.updateProductsCheckout(this.checkout, this.selectedCustomer);
  } 
  
}
