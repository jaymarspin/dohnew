import { Component, OnInit } from '@angular/core';
 
import { ServiceService } from '../services/service.service'
import {Location} from '@angular/common';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  doc:any
   baseY:any = 150
  constructor(public service: ServiceService,private location: Location) { }

  ngOnInit(): void {
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
