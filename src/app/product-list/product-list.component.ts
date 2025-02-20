import { CommonModule, Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BikesService } from '../bikeservice/bikes.service';
import { CartService } from '../bikeservice/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, MatCardModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  ngOnInit(): void {

    this.#bikeservice.Bikes(this.products);
  }
 
  #bikeservice = inject(BikesService);
  #cartService = inject(CartService);
  #location = inject(Location);

  products = [
    { id: 1, name: 'Mt-15', description: "Sports Model", price: 240000, offer:25000, imageUrl: 'assets/img/mt-15.jpg'},
    { id: 2, name: 'Fz-s v4', description: "Semi Sports Model", price: 160000, offer: "No offer Limited Edition", imageUrl: 'assets/img/fz-s-v4.jpg'},
    { id: 3, name: 'Classic 350', description: "Modified Classic 350", price: 280000, offer: 30000, imageUrl: 'assets/img/classic-350.jpg'},
    { id: 4, name: 'Ns 200', description: "Semi Sports Model", price: 900000, offer: "free", imageUrl: 'assets/img/ns-200.jpg'},
  ] 


  addToCart(product:any){
    this.#cartService.addToCart(product);
    alert(`${product.name} added to cart`);
  }

  goBack(){
    this.#location.back();
  }
}
 
