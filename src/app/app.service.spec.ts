import { Http } from '@angular/http';
import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing'

import { ProductsCheckoutService } from './app.service';
import { ProductCart, Checkout } from './model/product-checkout.model';
import { ProductDetail } from './model/product-detail.model';

describe('AppService', () => {
  let service: ProductsCheckoutService;
  let customers: string [] = new Array<string>();
  let classicProduct: ProductDetail;
  let standoutProduct: ProductDetail;
  let premiumProduct: ProductDetail;

  beforeEach(async(() => {
      service = new ProductsCheckoutService();
      let products= service.getProducts();
      classicProduct = products.find(p => p.id == 'Classic');
      standoutProduct = products.find(p => p.id == 'Standout');
      premiumProduct = products.find(p => p.id == 'Premium');
      customers = service.getCustomers();
    }));

    //test updateProductCart method
    it('Customer: Unilever, SKUs Scanned: 3 classic => Get `3 for 2` deal => Total expected: $539.98', async(() => {
      let classic = new ProductCart(classicProduct, 3);
      expect(service.updateProductCart(classic, 'UNILEVER').totalAfterDiscount).toEqual(539.98);
    }));

    it('Customer: Apple, SKUs Scanned: 1 standout => the price drops to $299.99 per ad => Total expected: $299.99', async(() => {
      let standout = new ProductCart(standoutProduct, 1);
      expect(service.updateProductCart(standout, 'APPLE').totalAfterDiscount).toEqual(299.99);
    }));

    it('Customer: Nike, SKUs Scanned: 4 premium =>  price drops to $379.99 per ad => Total expected: $1519.96', async(() => {
      let premium = new ProductCart(premiumProduct, 4);
      expect(service.updateProductCart(premium, 'NIKE').totalAfterDiscount).toEqual(1519.96);
    }));

    it('Customer: Ford, SKUs Scanned: 5 classic => Get `5 for 4` deal => Total expected: $1079.96', async(() => {
      let classic = new ProductCart(classicProduct, 4);
      expect(service.updateProductCart(classic, 'FORD').totalAfterDiscount).toEqual(1079.96);
    }));

    it('Customer: Ford, SKUs Scanned: 1 standout =>  the price drops to $309.99 per ad => Total expected: $309.99', async(() => {
      let standout = new ProductCart(standoutProduct, 1);
      expect(service.updateProductCart(standout, 'FORD').totalAfterDiscount).toEqual(309.99);
    }));

    it('Customer: Ford, SKUs Scanned: 4 premium => the price drops to $389.99 per ad => Total expected: $1559.96', async(() => {
      let premium = new ProductCart(premiumProduct, 4);
      expect(service.updateProductCart(premium, 'FORD').totalAfterDiscount).toEqual(1559.96);
    }));

    //test updateProductsCheckout method
    it('Default Customer - ID added: `classic`, `standout`, `premium` => Total expected: $987.97', async(() => {
      let classic = new ProductCart(classicProduct, 1);
      let standout = new ProductCart(standoutProduct, 1);
      let premium = new ProductCart(premiumProduct, 1);
      let checkout: Checkout = new Checkout(new Array<ProductCart>()); 
      checkout.productsToCheckout.push(classic, standout, premium);
      expect(service.updateProductsCheckout(checkout, '').grandTotal).toEqual(987.97);
    }));

    it('Customer: Unilever, SKUs Scanned: 3 classic, 1 premium => Total expected: $934.97', async(() => {
      let classic = new ProductCart(classicProduct, 3);
      let premium = new ProductCart(premiumProduct, 1);
      let checkout: Checkout = new Checkout(new Array<ProductCart>()); 
      checkout.productsToCheckout.push(classic, premium);
      expect(service.updateProductsCheckout(checkout, 'UNILEVER').grandTotal).toEqual(934.97);
    }));

    it('Customer: Apple, SKUs Scanned: 3 standout, 1 premium => Total expected: $1294.96', async(() => {
      let standout = new ProductCart(standoutProduct, 3);
      let premium = new ProductCart(premiumProduct, 1);
      let checkout: Checkout = new Checkout(new Array<ProductCart>()); 
      checkout.productsToCheckout.push(standout, premium);
      expect(service.updateProductsCheckout(checkout, 'APPLE').grandTotal).toEqual(1294.96);
    }));

    it('Customer: Nike, SKUs Scanned: 4 premium =>  price drops to $379.99 per ad => Total expected: $1519.96', async(() => {
      let premium = new ProductCart(premiumProduct, 4);
      let checkout: Checkout = new Checkout(new Array<ProductCart>()); 
      checkout.productsToCheckout.push(premium);
      expect(service.updateProductsCheckout(checkout, 'NIKE').grandTotal).toEqual(1519.96);
    }));

    it('Customer: Ford, SKUs Scanned: 5 classic, 1 standout, 4 premium  => Total expected: $2949.91', async(() => {
      let classic = new ProductCart(classicProduct, 5);
      let standout = new ProductCart(standoutProduct, 1);
      let premium = new ProductCart(premiumProduct, 4);
      let checkout: Checkout = new Checkout(new Array<ProductCart>()); 
      checkout.productsToCheckout.push(classic, standout, premium);
      expect(service.updateProductsCheckout(checkout, 'FORD').grandTotal).toEqual(2949.91);
    }));
  });

