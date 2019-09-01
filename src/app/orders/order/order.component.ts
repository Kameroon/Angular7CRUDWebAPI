import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { environment } from 'src/environments/environment';
import { Order } from 'src/app/shared/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {

  // -- Contient la liste des menus --
  orderList: Order[];

  /*
  * -- Injecter orderService pour pouvoir l'utiliser
  * -- Injecter MatDIalog pour gérer le popup
  */
  constructor(private service: OrderService, private dialogue:MatDialog) { }

  ngOnInit() {
     this.resetForm();

     //this.service.getOrderList().then(result => this.orderList = result as Order[]);
  }

  // -- Initialisation du formulaire
  resetForm(form?: NgForm){
    if(form = null)
       form.resetForm();

    this.service.formData = {
      OrderID: null,
      OrderNo: Math.floor(10000+Math.random()*900000).toString(),
      CustomerID: 0,
      PMethod: '',
      GTotal: 0
    };

    // Initialisation de l'objet commande selectionné
    this.service.orderItems = [];
  }

  // -- !!!!!!!!!!!!!!!!!!!!! --
  returnRandomNumber() {
    return Math.floor(10000+Math.random()*900000).toString();
  }

  /*
  * -- Ouvre une popup avec un formulaire - pour ce faire on instal Angular Material pour Angular7
  * -- material.angular.io => npm install --save @angular/material @angular/cdk @angular/animations -- 
  * -- Puis configurer => import  app.module => importer aussi le theme material dans le style.css
  * -- Configuration du popup => https://material.angular.io/components/dialog/overview
  * -- Après avoir injecter MatDialogue dans le constructeur
  * 
  * -- Ajouter MatDialogConfig dans l'import
  */
  AddOrEditOrderItem(orderItemIndex, OrderID){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "50%";
      dialogConfig.data = { orderItemIndex, OrderID };
      this.dialogue.open(OrderItemsComponent, dialogConfig);
  }  

  onDeleteOrderItem(orderItemID: number, i: number) {
    if (confirm(environment.confirmMessage)) {
       this.service.orderItems.splice(i, 1);
    }
  }
}
