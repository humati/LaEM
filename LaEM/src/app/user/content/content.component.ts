import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  titles = ['Tâm sự', 'Đời sống', 'Du lịch'];
  constructor() {}

  ngOnInit(): void {}
}
