import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ShippingAgents } from '../../../models/shippingAgents';
import { KG1Rice, KG10Rice, KG5Rice, KG20Rice, LunchBox, Salt } from '../../../models/sku'
import * as firebase from 'firebase'
import { UserAuthService } from '../../../auth/user-auth.service';
import { FirestoreService } from '../../../../firestore.service';


@Component({
  selector: 'app-addcontainer',
  templateUrl: './addcontainer.component.html',
  styleUrls: ['./addcontainer.component.css']
})
export class AddcontainerComponent implements OnInit {

  AddContForm!: FormGroup;
  ShipAgents = ShippingAgents;
  timeStamp = firebase.default.firestore.FieldValue.serverTimestamp();
  LoggedUser = this.authen.currentUSer;

  KG1 = KG1Rice;
  KG5 = KG5Rice;
  KG10 = KG10Rice;
  KG20 = KG20Rice;
  Salts = Salt;
  Lunchbox = LunchBox;

  constructor(public fb: FormBuilder, public authen: UserAuthService, public Fs: FirestoreService) { }

  selectedCont!: string;

  ngOnInit() {

    console.log(this.selectedCont);

    this.AddContForm = this.fb.group({
      date_added: [Date.now()],
      inspection: [, Validators.required],
      added_by: [this.LoggedUser],
      agent: [, Validators.required],
      dft: [, Validators.required],
      container_number: [, Validators.required],
      shipment_number: [, Validators.required],
      vessel: [, Validators.required],
      status: ['Ready to unload', [Validators.required]],
      skus: this.fb.array([]),
      remaining: [],
      chiefUnload: [],
      unload_recorder: [],
      partial_unload: [false, Validators.required],
    });
  }

  get Skuform() {
    return this.AddContForm.get('skus') as FormArray;
  }

  addSku() {
    const product = this.fb.group({
      skuCode: [, [Validators.required]],
      qty: [, [Validators.required]],
      unit: [, [Validators.required]]
    })
    this.Skuform.push(product);
  }

  deleteSku(i: number) {
    this.Skuform.removeAt(i);
  }

  loading = false;
  submitHandler() {
    this.loading = true;
    this.AddContForm.patchValue({ remaining: this.AddContForm.value.skus })
    let docID = this.AddContForm.value.shipment_number + '_' + this.AddContForm.value.container_number
    this.Fs.fireWrite('lae-exwh', this.AddContForm.value, docID);
    this.loading = false;
  }

}
