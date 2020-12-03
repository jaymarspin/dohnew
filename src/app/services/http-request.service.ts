import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http'
import "rxjs"
import "rxjs-compat"
import { Router } from '@angular/router'

import { HOST_URL } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  server: string
  brgyid:number
  userid:number
  constructor(public http: Http,public router: Router) {
    this.server = HOST_URL

   }

  postData(file,body){
    let type = "application/json; charset=UTF-8"

    let headers = new Headers({'Content-Type': type
  })
    let options = new RequestOptions({headers: headers})

    return this.http.post(this.server + file, JSON.stringify(body), options).map(res => res)

  }

  getData(file){

    return this.http.get(this.server+file)
  }

}
