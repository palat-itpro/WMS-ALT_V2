import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddcontainerComponent } from './addcontainer/addcontainer.component';
import { AngularFirestore } from '@angular/fire/firestore'
import { UnloaddialogComponent } from './unloaddialog/unloaddialog.component'
import { ExwhService } from '../services/exwh.service';

export interface exWHcont {
  added_by: string;
  agent: string;
  container_number: string;
  date_added: number;
  dft: number;
  inspection: number;
  shipment_number: number;
  sku: [skuCode: string, qty: number];
  vessel: string;
}

@Component({
  selector: 'app-exwhcont',
  templateUrl: './exwhcont.component.html',
  styleUrls: ['./exwhcont.component.css']
})
export class ExwhcontComponent implements OnInit {

  lae_exWHRef = this.afs.collection('lae-exwh')


  constructor(public dialog: MatDialog,
    public afs: AngularFirestore,
    public exwhSv: ExwhService
  ) { }

  openDialog() {
    this.dialog.open(AddcontainerComponent);
  }

  exWHsubscribtion = this.afs.collection('lae-exwh', ref => ref.where('status', '==', 'Ready to unload'))
    .valueChanges();
  exWHdata!: any;

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

  async settoUnloading(sm: string, cnt: string) {
    this.exwhSv.selectedCont = { shipment_number: sm, container_number: cnt }
    this.dialog.open(UnloaddialogComponent);
  }


  ngOnInit() {
    this.exWHsubscribtion.subscribe((res: any) => {
      // res.forEach((element: any) => {
      // });
      // this.exWHdata = res;
      this.dataSource = new MatTableDataSource(res);
    });
  }

  ngOnDestroy() {
    this.exWHsubscribtion.subscribe().unsubscribe();
  }

}
