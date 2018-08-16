import { Injectable } from '@angular/core';

import { ProductCart, Checkout } from './model/product-checkout.model';
import { ProductDetail } from './model/product-detail.model';

@Injectable()
export class ProductsCheckoutService{   

    constructor() {}

    public updateProductsCheckout(checkout: Checkout, customer?: string){    
        let sum= 0;
        let productsCart = checkout.productsToCheckout;
        for (let key in productsCart) {
            productsCart[key] = this.updateProductCart(productsCart[key], customer);
            sum += productsCart[key].totalAfterDiscount;
        }
        checkout.grandTotal = sum;
        return checkout;
    }  

    public updateProductCart(productCart: ProductCart, customer?: string) {
        productCart.originalTotal = productCart.quantity * productCart.item.price;
        if(customer) {
            productCart.totalAfterDiscount = this.applyDiscount(productCart, customer);
        }
        else {
            productCart.totalAfterDiscount = productCart.originalTotal;
        }
        return productCart;
    } 

    public getProducts() {
        return [
            {
              "id": "Classic",
              "name": "Classic Ad",
              "description": "Offers the most basic level of advertisement",
              "price": 269.99
            },
            {
              "id": "Standout",
              "name": "Standout Ad",
              "description": "Allows advertisers to use a company logo and use a longer presentation text",
              "price": 322.99
            },
            {
              "id": "Premium",
              "name": "Premium Ad",
              "description": "Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility",
              "price": 394.99
            }
          ]
      }

    public getCustomers(){    
        return ["UNILEVER", "APPLE", "NIKE", "FORD"];
    }
    
    private applyDiscount(productCart: ProductCart, customer?: string) {
        let totalAfterDiscount = 0;
        switch (customer) {
            case 'UNILEVER':
            totalAfterDiscount = this.applyDiscountForUnilever(productCart);
                break;
            case 'APPLE':
            totalAfterDiscount = this.applyDiscountForApple(productCart);
                break;
            case 'NIKE':
            totalAfterDiscount = this.applyDiscountForNike(productCart);
                break;
            case 'FORD':
            totalAfterDiscount = this.applyDiscountForFord(productCart);
                break;
            default:
            totalAfterDiscount = productCart.originalTotal;
        }
        return totalAfterDiscount;
    }

    private applyDiscountForUnilever(productCart: ProductCart) {
        let quantity = productCart.quantity;
        if(productCart.item.id == 'Classic' && quantity >= 3 ) {
            let retail  =   quantity % 3;
            let dealItems = (quantity - retail) / 3 * 2 + retail;
            return dealItems * productCart.item.price;
        }  
        return productCart.originalTotal;
    }

    private applyDiscountForApple(productCart: ProductCart) {
        if(productCart.item.id == 'Standout') {
            return productCart.quantity * 299.99;
        }
        return productCart.originalTotal;
    }

    private applyDiscountForNike(productCart: ProductCart) {
        let quantity = productCart.quantity;
        if(productCart.item.id == 'Premium' && quantity >= 4) {
            return quantity * 379.99;
        }
        return productCart.originalTotal;
    }

    private applyDiscountForFord(productCart: ProductCart) {
        let quantity = productCart.quantity;
        if(productCart.item.id == 'Classic' && quantity >= 5) {
            let retail  =   quantity % 5;
            let dealItems = (quantity - retail) / 5 * 4 + retail;
            return dealItems * productCart.item.price;
        }
        if(productCart.item.id == 'Standout') {
            return productCart.quantity * 309.99;
        }
        if(productCart.item.id == 'Premium' && quantity >= 3 ) {
            return productCart.quantity * 389.99;
        }
        return productCart.originalTotal;
    }
}

