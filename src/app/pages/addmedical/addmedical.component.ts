import { Component, OnInit } from '@angular/core';
 
import { ServiceService } from '../../services/service.service'
import { HttpRequestService} from '../../services/http-request.service'
import {Location} from '@angular/common';
@Component({
  selector: 'app-addmedical',
  templateUrl: './addmedical.component.html',
  styleUrls: ['./addmedical.component.scss']
})
 
export class AddmedicalComponent implements OnInit {
 
  sample:any
  constructor(public service: ServiceService,public http: HttpRequestService,private location: Location) {
    this.sample = this.http.server+this.service.pdflink
   }

  ngOnInit(): void {
  }

 

  goback(){
    this.location.back();
  }

}
