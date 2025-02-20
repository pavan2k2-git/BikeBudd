import { Injectable } from '@angular/core';
import { BehaviorSubject, count } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  cartItems: any[] = [];

  #cartItemsCount = new BehaviorSubject<number>(0); 

  addToCart(product: any){

    this.cartItems.push(product);
    this.updateCartItemCount();
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  getCartItemCount(){
    return this.#cartItemsCount.asObservable();
  }

  updateCartItemCount(){
    this.#cartItemsCount.next(this.cartItems.length);
  }

  removeItemFromCart(itemId: number){
    this.cartItems = this.cartItems.filter(item => item.id != itemId);
    this.updateCartItemCount();
  }

  removeSelectedItems(): void {
    this.cartItems = this.cartItems.filter(item => !item.isSelected);
    this.updateCartItemCount();
  }
}
