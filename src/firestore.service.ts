import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  servTime(){
    return firebase.default.firestore.FieldValue.serverTimestamp()
  }

  constructor(private afs: AngularFirestore) { }

  //crud

  async fireWrite(col: string, data: any ,doc?: string){
   await this.afs.collection(col).doc(doc).set(data);
  }

  fireRead(col: string, data: any ,doc?: string){
    this.afs.collection(col).valueChanges();
   }

}
