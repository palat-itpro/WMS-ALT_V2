import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ShippingAgents } from '../../../../models/shippingAgents';
import { KG1Rice, KG10Rice, KG5Rice, KG20Rice, Salt, LunchBox } from '../../../../models/sku'
import * as firebase from 'firebase'
import { UserAuthService } from '../../../../auth/user-auth.service';
import { FirestoreService } from '../../../../../firestore.service';
import { ExwhService } from '../../../services/exwh.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { exwhCont } from '../../../../models/exwhCont'


@Component({
  selector: 'app-confirmunload',
  templateUrl: './confirmunload.component.html',
  styleUrls: ['./confirmunload.component.css']
})
export class ConfirmunloadComponent implements OnInit {

  confUnloadForm!: FormGroup;
  ShipAgents = ShippingAgents;
  timeStamp = firebase.default.firestore.FieldValue.serverTimestamp();
  LoggedUser = this.authen.currentUSer;

  KG1 = KG1Rice;
  KG5 = KG5Rice;
  KG10 = KG10Rice;
  KG20 = KG20Rice;
  Salts = Salt;
  Lunchbox = LunchBox;

  constructor(public fb: FormBuilder,
    public authen: UserAuthService,
    public Fs: FirestoreService,
    public dialog: MatDialog,
    public whServ: ExwhService,
    private afs: AngularFirestore
  ) { }

  selCnt: any = this.whServ.selectedCont;
  selCntDataSubscribtion: any;
  containerData: any;

  AllKG1 = ['A1', 'JG1', 'SW1', 'F1', 'S1', 'JB1', 'JR1'];
  AllKG5 = ['A5', 'JG5', 'F5', 'S5', 'JR5'];
  AllKG10 = ['A10', 'S10', 'JR10', 'JB10', 'F10', 'JG10']
  AllKG20 = ['JB20', 'S20'];

  BagsSKU = ['A10', 'S10', 'JR10', 'JB10', 'F10', 'JG10', 'JB20', 'S20']

  ngOnInit() {



    this.confUnloadForm = this.fb.group({
      // containerID: [this.selCnt],
      date_added: [Date.now()],
      chiefUnload: [this.LoggedUser, [Validators.required]],
      remaining: this.fb.array([]),
      inspection: [, Validators.required],
      added_by: [this.LoggedUser],
      agent: [, Validators.required],
      dft: [, Validators.required],
      container_number: [, Validators.required],
      shipment_number: [, Validators.required],
      vessel: [, Validators.required],
      status: ['Ready to unload'],
      skus: this.fb.array([]),
      unload_recorder: [, Validators.required],
      unload_start: [, Validators.required],
      partial_unload: [false, Validators.required],
    });

    this.selCnt = this.selCnt.shipment_number + '_' + this.selCnt.container_number
    this.selCntDataSubscribtion = this.containerData = this.afs.collection('lae-exwh')
      .doc(this.selCnt)
      .valueChanges()
      .subscribe((res: any) => {
        this.containerData = res;
        for (const item of res.remaining) {
          if (res.remaining.length != this.confUnloadForm.value.remaining.length)
            this.addSku()
        }
        this.confUnloadForm.setValue(res);
        this.confUnloadForm.patchValue({ unload_recorder: this.LoggedUser })
        // this.confUnloadForm.patchValue({remaining:res.remaining,skus:res.skus});
      });

    // this.confUnloadForm.patchValue({ remaining: this.containerData.remaining })
  }



  unitDisplay(sku: string) {
    if (this.BagsSKU.includes(sku)) {
      console.log(sku)
      return 'Bags';
    }
    else {
      return 'Bales'
    }
  }


  ngOndestroy() {
    this.selCntDataSubscribtion.unsubscribe();
  }

  get Skuform() {
    return this.confUnloadForm.get('skus') as FormArray;
  }

  get Remainingform() {
    return this.confUnloadForm.get('remaining') as FormArray;
  }

  addSku() {
    const product = this.fb.group({
      skuCode: [, Validators.required],
      qty: [, Validators.required],
      unit: [, Validators.required]
    })
    this.Skuform.push(product);
    this.Remainingform.push(product);

  }

  deleteSku(i: number) {
    this.Skuform.removeAt(i);
  }

  loading = false;
  submitHandler() {
    this.loading = true;
    let docID = this.confUnloadForm.value.shipment_number + '_' + this.confUnloadForm.value.container_number
    this.Fs.fireWrite('lae-exwh', this.confUnloadForm.value, docID);
    this.loading = false;
  }

}
