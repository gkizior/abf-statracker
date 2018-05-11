import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-stats-list',
  templateUrl: './stats-list.component.html',
  styleUrls: []
})
export class StatsListComponent implements OnInit {
  statsObservable2: AngularFireList<any[]>;
  statsObservable: Observable<any[]>;



  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.statsObservable = this.db.list('/stats').valueChanges();
    this.statsObservable2 = this.db.list('/stats');
  }

  addCourse(): void {
    const stats = {
          title: 'testing',
          description: 'description',
          url: 'example.come',
      };
      const ref = this.db.database.ref('/stats');
      ref.push(stats);
  }

  print(x) {
    console.log(x);
    console.log(x.title);
  }
}
