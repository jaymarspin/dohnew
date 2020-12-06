import { Component, OnInit } from '@angular/core';
 
import { ServiceService } from '../../services/service.service'
import { HttpRequestService} from '../../services/http-request.service'
import {Location} from '@angular/common';
import {Router} from '@angular/router'
import Swal from 'sweetalert2' 

@Component({
  selector: 'app-addmedical',
  templateUrl: './addmedical.component.html',
  styleUrls: ['./addmedical.component.scss']
})
 
export class AddmedicalComponent implements OnInit {
 
  sample:any

  fname:any = ""
  lname:any = ""
  mname:any = ""
  age:any = ""
  sex:any = ""
  address:any = ""
  impression:any = ""
  remarks:any = ""
  issuingdate:any = ""

  userType:any
  constructor(public service: ServiceService,public http: HttpRequestService,private location: Location,private router: Router) {
    this.sample = this.http.server+this.service.pdflink
   }

  ngOnInit(): void {
    this.userType = localStorage.getItem("role")
  }

 

  goback(){
    this.location.back();
  }



  addmedical(){
    let userid = localStorage.getItem("userid")


    let extension:number = 0
     

    if(this.userType == 3) extension = 1

    if(this.fname.trim() != "" && this.lname.trim() != "" && this.mname.trim() != "" && this.sex.trim() != "" && this.age != null && this.age != 0 && this.address.trim() != "" && this.sex.trim() != "" && this.impression.trim() != ""
    && this.remarks.trim() != "" && this.issuingdate.trim() != ""){
      var loader = document.getElementById("cover-spin")
      loader.style.display = "block"
      let data = {
        testid: this.service.testid,
        fname: this.fname,
        mname: this.mname,
        lname: this.lname,
        sex: this.sex,
        address: this.address,
        age: this.age,
        impression: this.impression,
        remarks: this.remarks,
        issuing: this.issuingdate,
        filename: this.service.pdflink,
        userid: userid,
        extension: extension,


      }
    this.http.postData("addmedical.php",data).subscribe(res =>{
      loader.style.display = "none"
      let result = res.json()
      if(result.message == "success"){


        if(this.userType == "1"){

          Swal.fire(
            'Good job!',
            'Successfully Recorded',
            'success'
          )
          this.router.navigate(["certificate/"+result.id])
        }else{
          Swal.fire(
            'Good job!',
            'Successfully Recorded! Recieved by the main office',
            'success'
          )
          this.location.back();
        }
        
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please try again later',
          footer: ' '
        })
      }
      
    })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please complete the fields below',
        footer: ' '
      })
    }
    
  }

}
