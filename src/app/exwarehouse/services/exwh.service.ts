import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {Observable, of} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ExwhService {

  selectedCont: any;

  constructor(private afs: AngularFirestore) { }
}
