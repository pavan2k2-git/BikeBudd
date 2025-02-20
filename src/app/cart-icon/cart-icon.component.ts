import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../bikeservice/cart.service';
import { count } from 'rxjs';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cart-icon',
  imports: [RouterOutlet],
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.css'
})
export class CartIconComponent implements OnInit{

  cartItemsCount: number = 0;

  #cartService = inject(CartService);

  ngOnInit(): void {

    this.#cartService.getCartItemCount().subscribe(
      (count) => {
        this.cartItemsCount = count;
      }
    );
  }
}
 