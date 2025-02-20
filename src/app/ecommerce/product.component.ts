import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CartIconComponent } from '../cart-icon/cart-icon.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-product',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, CartIconComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

}
