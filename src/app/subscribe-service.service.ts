import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribeServiceService {
  apiUrl = "https://stibee.com/api/v1.0/lists/tsnBhVYz3gO7bWI6sWPFYsGSVD6R/public/subscribers"
  constructor(
  private http: HttpClient) { };
  validateEmail(email:string){
    var msg = ""
    var validated = true
    if (email.length == 0){

      msg = "이메일 주소를 입력하세요."
      validated = false
    }
    if (!this.validateEmailIndetail(email)){
        msg = "잘못된 이메일 주소입니다."
        validated = false
    }
    return {
      message : msg,
      validated : validated
    }

  }
  validateEmailIndetail(email:string){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  requestNewSubscriber(email:string){
    var paramMail = "email="+email
    return this.http.post('https://stibee.com/api/v1.0/lists/tsnBhVYz3gO7bWI6sWPFYsGSVD6R/public/subscribers', paramMail,{responseType:"text"})
  };
  getMsgAndStatus(data:string){
    var errorStatus = false
    var error = data.match(/<!--@ERROR_MSG:[\S\s]*?-->/gi)
    if (error){
      errorStatus = true
    }
    var value = data.match(/<div\s+class="msg">[\S\s]*?<\/div>/gi)
    var msg = (value[0].replace(/(<\/?[^>]+>)/gi, '')).trim();
    console.log(
      "에러 메시지가 들어왔나?:", error, "그럼 에러상태인가?:", errorStatus, "그럼 메시지 내용은 뭐야?", msg    )
    return {
      "isError": errorStatus,
      "msg" : msg
    }
  }
  // requestNewSubscriber(email:string){
  //   param = "email=" + encodeURI(email)
  //   return this.http.post<string>(apiUrl,param, httpOptions).pipe(
  //     catchError(this.handleError())
  //   );

// "Input"에 들어있는 값은 email 주소인데, 이걸 메소드 "getValue"에서 가져다 준다.
// 이 떄 받은 값은 "formRequest"메소드의 "value"가 된다.
// "value"는 인증 뒤 "serializeValue"를 한다.
// "serializeValue"가 하는 일은 대부분 HTML 정리정돈하는 JS 특유의 재미없는 일이다.
// 우리는 angular니까 email 주소 받아다가  "email = {메일주소}"로 만들면 된다.
// email 주소가 아니더라도 정의한 것들을 계속 "필드명 = 값& 구조로 쭉 붙이면 되는 모양이다.
//
// 그 뒤 "value"의 '&policy=stb_policy_true'를 날린다.
// "endpoint"는 api값이다.
//
// 그냥 우리는 https 호출해버리자
//


}
