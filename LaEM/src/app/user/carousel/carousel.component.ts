import { Component, OnInit } from '@angular/core';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';

@Component({
  selector: 'user-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  numberOfPosts: any;
  constructor() { }

  ngOnInit(): void {
    let self = this;
    self.numberOfPosts = [
      {
        postId: 1,
        html: CarouselItemComponent,
      },
      {
        postId: 2,
        html: CarouselItemComponent,
      },
      {
        postId: 3,
        html: CarouselItemComponent,
      },
      {
        postId: 4,
        html: CarouselItemComponent,
      },
      {
        postId: 5,
        html: CarouselItemComponent,
      }
    ];
  }

}
