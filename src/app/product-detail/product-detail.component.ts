import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BikesService } from '../bikeservice/bikes.service';
import { CommonModule, Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-product-detail',
  imports: [ CommonModule, MatCardModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{

  #route = inject(ActivatedRoute);

  #bikeService = inject(BikesService);

  #location = inject(Location);

  prod: any;

  ngOnInit(): void {
    const id = this.#route.snapshot.paramMap.get('id');
    this.prod = this.#bikeService.getBikeByID(id);
    console.log(this.prod, typeof this.prod);
  }

  goBack(){
    this.#location.back();
  }
}
