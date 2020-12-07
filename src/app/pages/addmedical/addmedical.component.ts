import { Component, OnInit,HostListener } from '@angular/core';
 
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

  ESCAPE_KEYCODE = 27;
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode === this.ESCAPE_KEYCODE) {
        this.goback()
    }
}
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
  update:boolean = false
  constructor(public service: ServiceService,public http: HttpRequestService,private location: Location,private router: Router) {
    this.sample = this.http.server+this.service.pdflink
   }

  ngOnInit(): void {
    if(this.service.cachedmeddata){
      this.update = true
      this.fname = this.service.cachedmeddata.fname
      this.lname = this.service.cachedmeddata.lname
      this.mname = this.service.cachedmeddata.mname
      this.sex = this.service.cachedmeddata.sex
      this.address = this.service.cachedmeddata.address
      this.remarks = this.service.cachedmeddata.remarks
      this.impression = this.service.cachedmeddata.impression
      this.issuingdate = this.service.cachedmeddata.issued
      this.age = this.service.cachedmeddata.age
    }
    this.userType = localStorage.getItem("role")
  }

 

  goback(){
    delete(this.service.cachedmeddata)
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
          this.service.editbool = true
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

  updatemedical(){
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
        id: this.service.cachedmeddata.id


      }
     

      this.http.postData("update-medical.php",data).subscribe(res =>{
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
