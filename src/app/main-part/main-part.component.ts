import { Component, OnInit } from '@angular/core';
// TODO : 서비스 네이밍이 못생김 ㅜㅜ 바꾸자
import {SubscribeServiceService} from '../subscribe-service.service';
import {HttpClient} from '@angular/common/http';

import {DomParser} from 'dom-parser';

@Component({
  selector: 'app-main-part',
  templateUrl: './main-part.component.html',
  styleUrls: ['./main-part.component.css']
})
export class MainPartComponent implements OnInit {
  res = ""
  msg = ""
  errorStatus = false
  clicked = false
  successMsg = "구독완료! 메일함에서 웰컴 메일을 확인해 주세요! "
  duplicatedMsg = "이미 구독 중인 이메일 주소입니다."
  emailAddress = ""

  constructor(
    private subscribeService: SubscribeServiceService
  ) { }
  // 주는 답변으로 확인한다.


  ngOnInit() {

  }

  // const body = { email: "tester@test.com"}
  onClickSubscribe(){
    this.subscribeService.requestNewSubscriber(this.emailAddress).subscribe(
      data => {
        var msgAndStatus = this.subscribeService.getMsgAndStatus(data)
        this.errorStatus = msgAndStatus["isError"]
        this.msg = msgAndStatus["msg"]
        this.clicked = true
        console.log(this.errorStatus)
        console.log(this.msg)
        console.log(this.clicked)
      }
    )
  }


}
