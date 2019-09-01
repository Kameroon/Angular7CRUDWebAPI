import { Component, OnInit, Inject } from '@angular/core';
/* --  Pour gérer les données renvoyée dans la popup  */
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderItem } from 'src/app/shared/order-item.model';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';
import { iif } from 'rxjs';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styles: []
})
export class OrderItemsComponent implements OnInit {
   // -- objet representant notre class --
   formData: OrderItem;

   // -- Contient la liste des menus --
   itemList: Item[];

   // -- Pour activer  le bouton valider si le formulaire est valide --
   isValid:boolean = true;

  /* --  Pour gérer les données renvoyée dans la popup  */
  constructor(@Inject(MAT_DIALOG_DATA) public data,
      public dialogRef:MatDialogRef<OrderItemsComponent>,
      private itemService:ItemService,
      private orderService: OrderService) { }

  ngOnInit() {
      // -- Récupération de la liste des menus au chargement de la page --
      this.itemService.getItemList()
                      .then(result => this.itemList = result as Item[]);

      // -- On vérifie s'il s'agit d'une nouvelle donnée ou d'une ligne de la liste --
      if(this.data.orderItemIndex == null){
          // -- Initialisation du formulaire --
          this.formData = {
              OrderItemID: null,
              OrderID: this.data.OrderID,
              ItemID: 0,
              ItemName: '',
              Price: 0,
              Quantity: 0,
              Total: 0
          }
      }
      else{
          this.formData = Object.assign({}, this.orderService.orderItems[this.data.orderItemIndex]);
      }
          
  }

  // -- Lorsqu'on selection un menu, on récupère le prix correspondant --
  updatePrice(ctrl){
     // --  --
     if(ctrl.selectedIndex == 0){
       this.formData.Price = 0;
       this.formData.ItemName = '';
     }
     else{
       this.formData.Price = this.itemList[ctrl.selectedIndex - 1].Price;
       this.formData.ItemName = this.itemList[ctrl.selectedIndex - 1].Name;
     }

     // --  --
     this.updateTotal();
  }

  /*
  * -- Lorsqu'on selection un menu, on récupère le prix total --
  * et on limite à 2 décimal après la virgule
  */
  updateTotal(){
     this.formData.Total = parseFloat((this.formData.Quantity * this.formData.Price).toFixed(2));
  }

  // -- Pour gérer un formulaire on importe "NgForm"  --
  // -- Ajouter ou Modifier à partir du formulaire
  onSubmit(form: NgForm){
      // -- On vérifie que le formulaire est valide avant --  
      if(this.validateFrom(form.value)){
          // -- Cas d'Ajout --
          if(this.data.orderItemIndex == null){
              // -- on enregistre les données du formulaire --
              this.orderService.orderItems.push(form.value);
          }
          else{  // -- Cas Modif --
              // -- on enregistre les données du formulaire --
              this.orderService.orderItems[this.data.orderItemIndex] = form.value;
          }

          // -- On ferme le formulaire --
          this.dialogRef.close();
      }
  }

  // -- Pour activer  le bouton valider si le formulaire est valide --
  validateFrom(formData: OrderItem){
      this.isValid = true;
      if(formData.ItemID == 0){
         this.isValid = false;
      } else if(formData.Quantity == 0){
         this.isValid = false;
      }

      return this.isValid;
  }
}
