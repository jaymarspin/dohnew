import { Component, OnInit, OnDestroy,HostListener} from '@angular/core';
 
import { ServiceService } from '../services/service.service'
import {Location} from '@angular/common';
import { HttpRequestService} from '../services/http-request.service' 
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
 
export class ReportComponent implements OnInit,OnDestroy {
  ESCAPE_KEYCODE = 27;
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode === this.ESCAPE_KEYCODE) {
        this.goback()
    }
}
 
  doc:any
   baseY:any = 150
  constructor(public service: ServiceService,private location: Location,public http: HttpRequestService ) { }

  ngOnInit(): void {
    // this.http.getData(this.sample).subscribe(res =>{
    //   console.log(res)
    // })
  }



  ngOnDestroy(){

    delete(this.service.pdfdata)
  }


  



  testAfterPrint(){
   
 
  }

  goback(){
    this.location.back();
  }
 


}
