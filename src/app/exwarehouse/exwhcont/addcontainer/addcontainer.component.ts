import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , FormArray, Validators } from '@angular/forms';
import { ShippingAgents } from '../../../models/shippingAgents';
import * as firebase from 'firebase'

@Component({
  selector: 'app-addcontainer',
  templateUrl: './addcontainer.component.html',
  styleUrls: ['./addcontainer.component.css']
})
export class AddcontainerComponent implements OnInit {

  AddContForm!: FormGroup;
  ShipAgents = ShippingAgents;
  fieldRequired = Validators.required
  timeStamp = Date.now();

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.AddContForm = this.fb.group({
      date_added:[this.timeStamp,this.timeStamp],
      inspection: [,this.fieldRequired],
      added_by: [,this.fieldRequired],
      agent: [,this.fieldRequired],
      dft: [,this.fieldRequired],
      container_number: [,this.fieldRequired],
      shipment_number: [,this.fieldRequired],
      vessel: [,this.fieldRequired],
      skus: this.fb.array([])
    });
  }

  get Skuform() {
    return this.AddContForm.get('skus') as FormArray;
  }

  addSku() {
    const sku = this.fb.group({
      skuCode : [,this.fieldRequired],
      qty: [,this.fieldRequired],
    });
    this.Skuform.push(sku);
  }

  deleteSku(i: number) {
    this.Skuform.removeAt(i);
  }

}
