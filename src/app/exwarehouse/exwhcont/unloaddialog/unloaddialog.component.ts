import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { ExwhService } from '../../services/exwh.service';
import { AngularFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-unloaddialog',
  templateUrl: './unloaddialog.component.html',
  styleUrls: ['./unloaddialog.component.css']
})
export class UnloaddialogComponent implements OnInit {


  constructor(
    public fireServ: FirestoreService,
    public exwhSv: ExwhService,
    public dialog: MatDialog,
    private afs: AngularFirestore
    ) { }

    selCont: any = this.exwhSv.selectedCont
    docID = this.exwhSv.selectedCont.shipment_number + `_` +this.exwhSv.selectedCont.container_number

  unloadCont(){
    console.log(this.docID)
    this.afs.collection('lae-exwh').doc(this.docID).update({
      status:'unloading',
      unload_start:this.fireServ.servTime()
    })
    .catch((err: any) => {console.log(err)})
    .then();
  }



  ngOnInit() {
  }

}
