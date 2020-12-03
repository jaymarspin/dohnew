import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service'
@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnInit {
  sample:any = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf"
  constructor(public service:ServiceService) { }

  ngOnInit(): void {
  }
  print(){
    window.print()

  }


  save(){
    this.service.doc.save("randallpdf.pdf")
  }

  ngOnDestroy(){
  }




  testAfterPrint(){
    console.log("randall")

    // console.log(event)
    // this.service.addReport(this.service.reportData)
  }



}
