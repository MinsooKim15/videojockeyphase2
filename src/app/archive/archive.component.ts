import { HostListener,Component, OnInit } from '@angular/core';
import {Mail} from '../mail';
import {MailService} from '../mail.service';
import {IntervalService} from '../interval.service';


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
  maxSize = 6;
  interval: Number;
  // interval -> 데이터 노출 주기
  // maxSize => 최대 노출 페이지 수
  public innerWidth: any;
  public innerHeight: any;

  constructor(private mailService : MailService, private intervalService : IntervalService) {
    if (window.innerWidth > 1230){
      this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
      };
    }else{
      if (window.innerHeight > 800){
        this.config = {
        itemsPerPage: 7,
        currentPage: 1,
        totalItems: 0
        };
      }else if(window.innerHeight > 730){
        this.config = {
        itemsPerPage: 6,
        currentPage: 1,
        totalItems: 0
        };
      }else{
        this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: 0
        };
      }

    }

  }
  // constructoe(){}
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    if (this.innerWidth > 1230) {
      this.config["itemsPerPage"] = 10
      console.log(this.config.itemsPerPage)
    }else{
      if (window.innerHeight > 800){
        this.config["itemsPerPage"] = 7
      }else if(window.innerHeight > 730){
        this.config["itemsPerPage"] = 6
      }else{
        this.config["itemsPerPage"] = 5
      }
    }
  }

  ngOnInit() {
    this.intervalService.getInterval().then((doc)=>{
      if(doc.exists){
        const data = doc.data()
        this.interval = data["showAfterSend"]
    }else{
        this.interval = 3
    }

    var day = new Date();
    day.setDate(day.getDate()- Number(this.interval)*7);
    this.mailService.getMails(day).subscribe(data => {
      this.mails = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data()) as object
        } as Mail;
      })
      this.config.totalItems = this.mails.length
    });
  })
  }
  pageChanged(event){
    this.config.currentPage = event;
  }

  setNumber(num : Number): void{
    this.pageNumber = num;
  };

}
