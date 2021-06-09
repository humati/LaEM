import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  title = 'Tâm sự';
  constructor() { }

  ngOnInit(): void {
  }

}
