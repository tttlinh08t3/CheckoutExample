import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductDetail } from '../model/product-detail.model';
import { ProductCart } from '../model/product-checkout.model';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  @Input() public product: ProductDetail;
  @Output() public productCart : EventEmitter <ProductCart> = new EventEmitter<ProductCart>();
  public quantity: number = 1 ;

  constructor() {   }

  addProduct() {
    let selectedProduct = new ProductCart(this.product,this.quantity);
    this.productCart.emit(selectedProduct);
  }
}
