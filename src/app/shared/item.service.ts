import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  // -- Pour pouvoir consommer le WebApi --
  constructor(private http:HttpClient) { }

  // -- Retourne la liste de menu depuis le WebApi en passant par le service --
  getItemList(){
     return this.http.get(environment.apiUrl+'/Item').toPromise();
  }
}
