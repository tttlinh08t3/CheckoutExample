import { Injectable } from '@angular/core';
import { ProductDetail } from './product-detail.model';

@Injectable()
export class ProductCart{
    item?: ProductDetail;  
    quantity?: number;
    originalTotal?: number;
    totalAfterDiscount?: number;    

   constructor(item: ProductDetail, quantity: number) { 
    this.item = item;
    this.quantity = quantity;
    }
}

@Injectable()
export class Checkout{
    grandTotal?:number;  
    productsToCheckout?: ProductCart [] = new Array<ProductCart>(); 

   constructor(productsToCheckout: ProductCart []) { 
    this.productsToCheckout = productsToCheckout;
    }
}

