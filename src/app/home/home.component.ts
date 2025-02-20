import { Component, inject, OnInit } from '@angular/core';
import { BikesService } from '../bikeservice/bikes.service';
import { CommonModule, Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  #bikeservice = inject(BikesService);
  #location = inject(Location);

  bikes: any = [];
 
  ngOnInit(): void {
    this.bikes = this.#bikeservice.getBikes().slice(1,2);
  }

  goBack(){
    this.#location.back();
  }
}
