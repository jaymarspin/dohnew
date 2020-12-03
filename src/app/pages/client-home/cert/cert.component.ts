import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import Swal from 'sweetalert2'
import { HttpRequestService} from '../../../services/http-request.service'
import { Router,ActivatedRoute } from '@angular/router'

import {Location} from '@angular/common';
@Component({
  selector: 'app-cert',
  templateUrl: './cert.component.html',
  styleUrls: ['./cert.component.scss']
})
export class CertComponent implements OnInit {
  sample:any = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf"

  id:any
  pdfsource:any
  constructor(private activateRoute: ActivatedRoute,private router: Router,public service:ServiceService,public request: HttpRequestService,private location: Location) {
    this.id = this.activateRoute.snapshot.paramMap.get("id")
  }
    
  ngOnInit(): void {
    console.log(this.id)

    this.request.getData("get-cert.php?id="+this.id).subscribe(res =>{
      console.log(res)
      this.pdfsource = this.request.server+res.json().file_name
      console.log(this.pdfsource)
    });
  }


//  Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: 'Your searchbox is empty',
//           footer: '<span>You need to fill the searchbox to search for something</span>'
//         })

// showVALID(){

//   Swal.fire({
//     icon: 'success',
//     position: 'center',
//     title: 'VALIDITY...',
//     text: 'The Validity of this 7 DAYS ONLY',
//     footer: '<span>You will use this before It Will Expire!</span>'
//   })

// }



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

  goback(){
    this.location.back();
  }


}
