import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BikesService {

  constructor() { }

  bikes:any = []

  Bikes(products: any){
    this.bikes = products;
  }

  getBikes(){
    return this.bikes;
  }

  getBikeByID(id: any){
    return this.bikes.find((product:  any) => product.id == id)
  }
}
 
