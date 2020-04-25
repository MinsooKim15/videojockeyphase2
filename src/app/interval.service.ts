import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
@Injectable({
  providedIn: 'root'
})
export class IntervalService {

  constructor(private firestore:AngularFirestore) { }
  getInterval(){
    return this.firestore.collection("config").doc("mailsConfig").ref.get()
  }
  updateInterval(interval : number){
    const newInterval = {"showAfterSend" : interval}
    this.firestore.collection("config").doc("mailsConfig").update(newInterval);
  }
}
