import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsCheckoutService } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,  
    FormsModule
  ],
  providers: [
    ProductsCheckoutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
