import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  table: string;
  id: string;
  validResult: string;

  constructor(private db: AngularFireDatabase, private router: Router) { }

  ngOnInit() {
  }

  go() {
    this.id = (<HTMLInputElement>document.getElementById('inputsm')).value;
    this.table = '/stats/' + this.id;
    const result = this.db.database.ref(this.table).once('value').then(function(snapshot) {
      return snapshot.val() != null;
    });
    result.then(valid => this.redirect(valid));
  }

  redirect(valid: boolean) {
    if (valid) {
      this.router.navigate(['/' + this.id]);
    } else {
      console.log('Invalid');
      this.validResult = 'Invalid room entered.';
    }
  }

}
