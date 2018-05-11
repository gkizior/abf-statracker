import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-stat',
  templateUrl: './add-stat.component.html',
  styleUrls: ['./add-stat.component.css']
})
export class AddStatComponent implements OnInit {

  @Input()id: number;
  myForm: FormGroup;

  closeResult: string;
  modalReference: any;

  constructor(private modalService: NgbModal, private db: AngularFireDatabase) {
  }

  ngOnInit() {
  }

  addStat(): void {
    const number = document.getElementById('form')[0].value;
    const player = document.getElementById('form')[1].value;
    const minutes = document.getElementById('form')[2].value;
    const rebounds = document.getElementById('form')[3].value;
    const assists = document.getElementById('form')[4].value;
    const points = document.getElementById('form')[5].value;
    const stats = {
          number: number,
          player: player,
          minutes: minutes,
          rebounds: rebounds,
          assists: assists,
          points: points
      };
      const ref = this.db.database.ref('/stats');
      const addedStat = ref.push(stats);
      console.log(addedStat.key);
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
