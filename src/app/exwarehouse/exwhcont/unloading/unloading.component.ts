import { Component, OnInit,Output ,EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmunloadComponent } from '../unloading/confirmunload/confirmunload.component'
import { ExwhService } from '../../services/exwh.service';



@Component({
  selector: 'app-unloading',
  templateUrl: './unloading.component.html',
  styleUrls: ['./unloading.component.css']
})
export class UnloadingComponent implements OnInit {

  constructor(private afs: AngularFirestore,
    public dialog: MatDialog,
    public whServ: ExwhService) { }

  ngOnInit() {

    this.afs.collection('lae-exwh', ref => ref.where('status', '==', 'unloading'))
      .valueChanges().subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
      });

  }


  displayedColumns: string[] = ['Agent',
    'Shipment_Number',
    'Container_Number',
    'DFT',
    'Product',
    'Inspection',
    'Vessel_Name',
    'action'
  ];
  dataSource: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  confirmUnload(sm: any, cnt: any) {
    this.whServ.selectedCont = {shipment_number:sm,container_number:cnt};
    this.dialog.open(ConfirmunloadComponent,{disableClose:true});
  }

}
