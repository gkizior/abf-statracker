import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-stats-list',
  templateUrl: './stats-list.component.html',
  styleUrls: []
})
export class StatsListComponent implements OnInit {

  statsRef: AngularFireList<any>;
  stats$: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit() {
    this.statsRef = this.db.list('/stats');
    this.stats$ = this.statsRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val()
      }));
    });
  }

  onChange(key: string, category: string, value: string) {
    const elementValue = (<HTMLInputElement>document.getElementById(value)).value;
    const change = JSON.parse('{ "' + category + '": "' + elementValue + '"}');
    const addedStat = this.db.object('/stats/' + key).update(change);
  }
}
