import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Le formulaire peut ne pas marcher s'il on a pas importé le formsModule
import { FormsModule } from '@angular/forms';
// Pour Angular material 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Pour Angular material et les popups et annimations
import { MatDialogModule } from '@angular/material/dialog';
// -- Pour pouvoir consommer le WebApi --
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { OrderItemsComponent } from './orders/order-items/order-items.component';
import { OrderService } from './shared/order.service';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderComponent,
    OrderItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule
  ],
  // -- Pour gérer  l'ouverture de la popup ajouter ceci --
  entryComponents:[OrderItemsComponent],

  providers: [OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
