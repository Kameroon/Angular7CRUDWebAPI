import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // Dans chaque service on crée une propriété au type de celui-ci. 
  // Dans app.module, on injecte le service enq question [Providers] afin que celle-ci soit visible dans tous les components
  formData: Order;
 
  // Objet commande selectionné dans la listes des commandes
  orderItems: OrderItem[];

  constructor(private http:HttpClient) { }

  
/*
  getOrderList(){
      return this.http.get(environment.apiUrl+'/Order').toPromise();
  }*/
}
