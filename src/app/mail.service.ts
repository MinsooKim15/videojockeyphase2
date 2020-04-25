import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Mail } from './mail';

@Injectable()
export class MailService {

  constructor(private firestore:AngularFirestore) { }
  getMails(day : Date){
    // this.mailCollectionRef = this.firestore.collection("mails").orderBy('order field');
    return  this.firestore.collection('mails', ref => ref.where('published', "<", day).orderBy('published')).snapshotChanges();
  }
  createMail(mail:Mail){
    return this.firestore.collection("mails").add(mail);
  }
  updateMail(mail:Mail){
    delete mail.id;
    this.firestore.doc('mails/'+mail.id).update(mail);
  }
  deleteMail(mailId:string){
    this.firestore.doc('mail/'+mailId).delete();
  }

}
