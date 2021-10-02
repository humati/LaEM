import { Component, OnInit } from '@angular/core';
import { firebaseConfig } from './credentials';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'LaEM';
  ngOnInit() {}
}
