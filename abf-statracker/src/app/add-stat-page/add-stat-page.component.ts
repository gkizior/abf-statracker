import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-stat-page',
  templateUrl: './add-stat-page.component.html',
  styleUrls: ['./add-stat-page.component.css'],
})
export class AddStatPageComponent implements OnInit {

  @Output() clicked = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  addPage() {
    this.clicked.emit( {
      open: true
    });
  }

}
