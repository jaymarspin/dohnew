import { Component, OnInit } from '@angular/core';
 
import { ServiceService } from '../services/service.service'
import {Location} from '@angular/common';
import { HttpRequestService} from '../services/http-request.service' 
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
 
export class ReportComponent implements OnInit {
  
 
  doc:any
   baseY:any = 150
  constructor(public service: ServiceService,private location: Location,public http: HttpRequestService ) { }

  ngOnInit(): void {
    // this.http.getData(this.sample).subscribe(res =>{
    //   console.log(res)
    // })
  }



  ngOnDestroy(){
  }


  



  testAfterPrint(){
    console.log("randall")
 
  }

  goback(){
    this.location.back();
  }
 


}
