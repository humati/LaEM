import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  numberOfPosts: any;
  constructor() {}

  ngOnInit(): void {
    let self = this;
    self.numberOfPosts = [
      {
        postId: 1,
      },
      {
        postId: 2,
      },
      {
        postId: 3,
      },
      {
        postId: 4,
      },
      {
        postId: 5,
      },
    ];
  }
}
