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
  addStat: boolean;
  enterRoom: boolean;

  blankStat = {
    number: '',
    player: '',
    minutes: '',
    rebounds: '',
    assists: '',
    points: ''
  };

  constructor(private db: AngularFireDatabase, private router: Router) { }

  ngOnInit() {
    this.addStat = true;
    this.enterRoom = false;
  }

  addStatChange() {
    this.addStat = !this.addStat;
  }

  go() {
    this.id = (<HTMLInputElement>document.getElementById('inputsm')).value;
    this.table = '/stats/' + this.id;
    const result = this.db.database.ref(this.table).once('value').then(function (snapshot) {
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

  newRoom(value: boolean) {
    if (value) {
      this.id = (<HTMLInputElement>document.getElementById('roomCode')).value;
    } else {
      this.id = this.randomString(5);
    }
    this.table = '/stats/' + this.id;
    const result = this.db.database.ref(this.table).once('value').then(function (snapshot) {
      return snapshot.val() != null;
    });
    result.then(valid => this.makeRoom(valid));
  }

  makeRoom(valid: boolean) {
    if (!valid) {
      const ref = this.db.database.ref('/stats/' + this.id);
      const addedStat = ref.push(this.blankStat);
      this.router.navigate(['/' + this.id]);
    } else {
      console.log('Invalid');
      this.validResult = 'Room already exists.';
    }
  }

  randomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  showInputRoom() {
    this.enterRoom = !this.enterRoom;
  }

}
