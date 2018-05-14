import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-stats-list',
  templateUrl: './stats-list.component.html',
  styleUrls: []
})
export class StatsListComponent implements OnInit {

  statsRef: AngularFireList<any>;
  stats$: Observable<any[]>;

  id: string;
  table: string;


  constructor(private db: AngularFireDatabase, private route: ActivatedRoute) {
    this.route.params.subscribe( params => console.log(params) );
  }

  ngOnInit() {
    this.id = window.location.pathname.substring(1);
    this.table = '/stats/' + this.id;
    this.statsRef = this.db.list('/stats/' + this.id);
    this.stats$ = this.statsRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val()
      }));
    });
    this.GetURLParameter();
  }

  onChange(key: string, category: string, value: string) {
    const textInput =  (<HTMLInputElement>document.getElementById(value + '' + key));
    const elementValue = textInput.value;
    const change = JSON.parse('{ "' + category + '": "' + elementValue + '"}');
    const addedStat = this.db.object(this.table + '/' + key).update(change);
  }

  GetURLParameter() {
    const sPageURL = window.location.pathname.substring(1);
    console.log(sPageURL);
  }

}
