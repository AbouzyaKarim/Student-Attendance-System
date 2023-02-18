import { Component, OnInit } from '@angular/core';
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.scss']
})
export class BestSellerComponent implements OnInit {

  constructor(private home:HomeComponent) { }

  ngOnInit(): void {
  }


}
