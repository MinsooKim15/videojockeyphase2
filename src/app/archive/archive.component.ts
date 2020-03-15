import { Component, OnInit } from '@angular/core';
import {Mail} from '../mail';
import {MailService} from '../mail.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  mails : Mail[];
  pageNumber : Number;
  numbers = [1,2,3,4,5];
  config: any;

  constructor(private mailService : MailService) {
    this.config = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };
  }
  // constructoe(){}

  ngOnInit() {
    this.mailService.getMails().subscribe(data => {
      this.mails = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data()) as object
        } as Mail;
      })
      this.config.totalItems = this.mails.length
    });
  }
  pageChanged(event){
    this.config.currentPage = event;
  }

  setNumber(num : Number): void{
    this.pageNumber = num;
  };
}
