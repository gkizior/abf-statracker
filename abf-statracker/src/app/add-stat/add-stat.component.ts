import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Component({
  selector: 'app-add-stat',
  templateUrl: './add-stat.component.html',
  styleUrls: ['./add-stat.component.css']
})
export class AddStatComponent implements OnInit {

  closeResult: string;
  modalReference: any;

  constructor(private modalService: NgbModal, private db: AngularFireDatabase) {}

  ngOnInit() {
  }

  addStat(): void {
    const stats = {
          name: 'name',
          time: 'time',
          points: 'points'
      };
      const ref = this.db.database.ref('/stats');
      ref.push(stats);
  }

  open(content) {
    this.modalReference = this.modalService.open(content);

    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  close() {
    this.addStat();
    this.modalReference.close();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
