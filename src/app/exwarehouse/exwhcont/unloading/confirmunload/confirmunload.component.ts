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
import { partorderRequest } from '../../../../models/pOrderReq'

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
  docID: any;
  sohSub: any;

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
  Unload_amount: any;

  AllKG1 = ['A1', 'JG1', 'SW1', 'F1', 'S1', 'JB1', 'JR1'];
  AllKG5 = ['A5', 'JG5', 'F5', 'S5', 'JR5'];
  AllKG10 = ['A10', 'S10', 'JR10', 'JB10', 'F10', 'JG10']
  AllKG20 = ['JB20', 'S20'];

  BagsSKU = ['A10', 'S10', 'JR10', 'JB10', 'F10', 'JG10', 'JB20', 'S20']

  ngOnInit() {

    this.sohSub = this.afs.collection('lae-soh').valueChanges().subscribe((res: any) => {
      res.forEach((element: any) => {
        localStorage.setItem(element.CodeName, element.qty);
      });
    })


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
      damaged: this.fb.array([]),
    });

    // this.confUnloadForm.controls['remaining'].disable()

    this.Unload_amount = this.fb.group({
      last_unload: this.fb.array([]),
    })


    this.selCnt = this.selCnt.shipment_number + '_' + this.selCnt.container_number
    this.selCntDataSubscribtion = this.containerData = this.afs.collection('lae-exwh')
      .doc(this.selCnt)
      .valueChanges()
      .subscribe((res: any) => {
        this.containerData = res;
        for (const item of res.remaining) {
          if (res.remaining.length != this.confUnloadForm.value.remaining.length) {
            this.addSku();
            this.addAmountUnload();
          }
        }

        this.confUnloadForm.setValue(res);
        // ---------------------------set docID
        this.docID = this.confUnloadForm.value.shipment_number + '_' + this.confUnloadForm.value.container_number
        this.confUnloadForm.patchValue({
          unload_recorder: this.LoggedUser,
        });
      });

  }


  unitDisplay(sku: string) {
    if (this.BagsSKU.includes(sku)) {
      return 'Bags';
    }
    else {
      return 'Bales'
    }
  }


  ngOndestroy() {
    this.selCntDataSubscribtion.unsubscribe();

    this.sohSub.subscribe().unsubscribe();
  }

  get Skuform() {
    return this.confUnloadForm.get('skus') as FormArray;
  }

  get Remainingform() {
    return this.confUnloadForm.get('remaining') as FormArray;
  }

  get Unload_amountform() {
    return this.Unload_amount.get('last_unload') as FormArray;
  }

  addSku() {
    const product = this.fb.group({
      skuCode: [, Validators.required],
      qty: [, Validators.required],
      unit: [, Validators.required],
    })
    this.Skuform.push(product);
    this.Remainingform.push(product);
  }


  addAmountUnload() {
    const amount = this.fb.group({
      unload_qty: [0, Validators.required],
      damaged: [0, Validators.required],
    })
    this.Unload_amountform.push(amount);
  }


  deleteSku(i: number) {
    this.Skuform.removeAt(i);
  }

  loading = false;
  submitHandler() {
    this.loading = true;

    this.Fs.fireWrite('lae-exwh', this.confUnloadForm.value, this.docID);
    this.loading = false;
  }


  diffCalc(amount: number) {
    let value = amount

  }

  partial = false;
  fullUnload = false;

  confirmunload() {

    let confForm = this.confUnloadForm.value.remaining
    let unloadAmount = this.Unload_amount.value.last_unload
    let RemaminingItems: Array<any> = []


    if (this.confUnloadForm.value.partial_unload == true) {

      unloadAmount.forEach((element: any, i: number) => {
        console.log(i)
        let unloadedPlusSOH = unloadAmount[i].unload_qty + Number(localStorage.getItem(element.skuCode));
        console.log(unloadedPlusSOH)
        this.updateSoh(unloadedPlusSOH, element.skuCode);

        RemaminingItems.push({
          qty: confForm[i].qty - unloadAmount[i].unload_qty,
          skuCode: confForm[i].skuCode,
          unit: confForm[i].skuCode,
        });

        if (unloadAmount[i].damaged > 0) {
          //Prepare damage record
          let damageRecord = {
            date: this.timeStamp,
            item: confForm[i].skuCode,
            loaded: confForm[i].qty,
            damaged: element.damaged,
            container_number: this.confUnloadForm.value.container_number,
            shipment_number: this.confUnloadForm.value.shipment_number,
            cheif_unload: this.confUnloadForm.value.chiefUnload,
            create_user: this.LoggedUser
          }
          this.afs.collection('lae-unload-damage').doc().set(damageRecord)
        }

      });
      console.log(RemaminingItems)
      //update partial to true
      // console.log('partial');
      //update remaining
      // for (const [i, item] of [confForm].entries()) {
      //   //Update SOH
      //   this.updateSoh(unloadAmount[i].unload_qty, confForm[i].skuCode);
      // RemaminingItems.push({
      //   qty: confForm[i].qty - unloadAmount[i].unload_qty,
      //   skuCode: confForm[i].skuCode,
      //   unit: confForm[i].skuCode,
      // });
      //   console.log(RemaminingItems)

      // if (item.damaged > 0) {
      //   //Prepare damage record
      //   let damageRecord = {
      //     date: this.timeStamp,
      //     item: confForm[i].skuCode,
      //     loaded: confForm[i].qty,
      //     damaged: item.damaged,
      //     container_number: this.confUnloadForm.value.container_number,
      //     shipment_number: this.confUnloadForm.value.shipment_number,
      //     cheif_unload: this.confUnloadForm.value.chiefUnload,
      //     create_user: this.LoggedUser
      //   }
      //   this.afs.collection('lae-unload-damage').doc().set(damageRecord)
      // }


      // this.confUnloadForm.patchValue({ remaining: RemaminingItems })

      // this.afs.collection('lae-exwh').doc(this.docID).update({ remaining: this.confUnloadForm.value.remaining });

    }
    else {
      unloadAmount.forEach((element: any, i: number) => {

        if (element.unload_qty === confForm[i].qty) {
          let ActualUnload = element.unload_qty + Number(localStorage.getItem(confForm[i].skuCode))
          console.log(ActualUnload)
          this.updateSoh(ActualUnload, confForm[i].skuCode)
        }

        //check short || extra

        if (element.unload_qty > confForm[i].qty) {

          let partOrder_req: partorderRequest = {
            date: this.timeStamp,
            remark: 'Extra unload from ' + this.confUnloadForm.value.container_number + ' shipment ' + this.confUnloadForm.value.shipment_number,
            requestor: this.authen.currentUSer,
            event: 'IN',
            status: 'pending',
            qty: element.unload_qty - confForm[i].qty,
            man_approve: null,
            section_sup: null
          }
          this.partRequest(partOrder_req);
          let diff = element.unload_qty - confForm[i].qty
          let toTalqty = element.unload_qty - diff + Number(localStorage.getItem(confForm[i].skuCode))
          console.log(toTalqty)
          this.updateSoh(toTalqty, confForm[i].skuCode)

        }
        if (element.unload_qty < confForm[i].qty) {
          let partOrder_req: partorderRequest = {
            date: this.timeStamp,
            remark: 'Short unload from ' + this.confUnloadForm.value.container_number + ' shipment ' + this.confUnloadForm.value.shipment_number,
            requestor: this.authen.currentUSer,
            event: 'OUT',
            status: 'pending',
            qty: confForm[i].qty - element.unload_qty,
            man_approve: null,
            section_sup: null
          }

          this.partRequest(partOrder_req);
          let toTalqty = element.unload_qty + Number(localStorage.getItem(confForm[i].skuCode))
          console.log(toTalqty)
          this.updateSoh(toTalqty, confForm[i].skuCode)
        }


        if (element.damaged > 0) {
          //Prepare damage record
          let damageRecord = {
            date: this.timeStamp,
            item: confForm[i].skuCode,
            loaded: confForm[i].qty,
            damaged: element.damaged,
            container_number: this.confUnloadForm.value.container_number,
            shipment_number: this.confUnloadForm.value.shipment_number,
            cheif_unload: this.confUnloadForm.value.chiefUnload,
            create_user: this.LoggedUser
          }
          this.afs.collection('lae-unload-damage').doc().set(damageRecord)
        }

      });
    }
    //Mark emp cont
    // this.afs.collection('lae-exwh').doc(this.docID).update({ status: 'unloaded' });
    this.afs.collection('lae-unload-logs').doc().set(this.confUnloadForm.value);
    // this.afs.collection('lae-exwh').doc(this.docID).update(this.confUnloadForm.value);

  }

  // this.afs.collection('lae-exwh').doc(this.selCnt).update({
  //   remaining: this.confUnloadForm.value.remaining,
  // });
  // this.afs.collection('lae-exwh_partial_log').doc(this.selCnt).set({
  //   date: Date.now(),
  //   remaining: this.confUnloadForm.value.remaining,
  //   chiefUnload: this.confUnloadForm.value.chiefUnload
  // });

  partRequest(data: partorderRequest) {
    this.afs.collection('lae-partorder-req').doc().set(data)
  }

  updateSoh(data: number, item: string) {
    this.afs.collection('lae-soh').doc(item).update({
      qty: data
    });
  }
}


