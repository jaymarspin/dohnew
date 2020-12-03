import { Component, OnInit } from '@angular/core';
import pdfjs from 'jspdf';
 import { Router } from '@angular/router'
 import { ServiceService } from '../../../services/service.service'
 import { HttpRequestService} from '../../../services/http-request.service'
import * as moment from "moment"

import Swal from 'sweetalert2'
import qrcode from 'yaqrcode'

import {MedicalService}  from '../../../report-print/medical.service'
@Component({
  selector: 'app-certlisting',
  templateUrl: './certlisting.component.html',
  styleUrls: ['./certlisting.component.scss']
})
export class CertlistingComponent implements OnInit {
  customers = 6546798
  rapid = Array()
  rapidCount:number
  base64: any



   search:string
   searchpass:boolean = false


   page:number
   limit:number
   pagebtntmp:any
   pagebtn:any

   doc:any
   baseY:any = 150
   cached:any


    fname:any
    lname:any
   age:any
   sex:string
   impression:string
   remarks:string
   address:string
   issued:string


   usershow:boolean = false
   certificate:any
   certificateSelect = Array()


   from:any

   to:any
  constructor(private medical: MedicalService,private router: Router,public service: ServiceService,public http: HttpRequestService) {
    this.page = 1
    this.limit = 50
    this.pagebtn = Array()
    this.certificateSelect.push({value: "medical", title: "Medical Certificate"})

   }
  ngOnInit(): void {

    if(localStorage.getItem("role") == "1") this.usershow = true

    this.getdata(this.page)


  }
  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
  }








  searchact(){


    if(!this.search){


      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Your searchbox is empty',
        footer: '<span>You need to fill the searchbox to search for something</span>'
      })

    }else{
      if(!this.search.trim()){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your searchbox is empty',
          footer: '<span>You need to fill the searchbox to search for something</span>'
        })
      }else{
        var loader = document.getElementById("cover-spin")
    loader.style.display = "block"
    this.http.getData("search-rapid.php?search="+this.search).subscribe(res =>{
      console.log(res)
      this.rapid = res.json()
      this.searchpass = true
      loader.style.display = "none"
    })
      }

    }

  }
  refreshed(){
    this.getdata(this.page)
    this.searchpass = false
    delete(this.search)
  }

  getdata(pager){
    this.pagebtn = Array()
    var loader = document.getElementById("cover-spin")
    loader.style.display = "block"
    this.http.getData("get-rapid.php?limit="+this.limit+"&page="+pager).subscribe(res =>{

      this.rapid = res.json().rapid
      this.rapidCount = res.json().rapid_count


      loader.style.display = "none"

      this.pagebtntmp =  this.rapidCount / this.limit
      for(var i = 1;i < this.pagebtntmp + 1;i++){
        this.pagebtn.push(i)
      }
    })
  }

  pager(page){
    this.page = page
    this.getdata(page)
  }

 
 

cacheData(item){
  this.cached = item
  console.log(this.cached)
}


reportData:any


delete(id){
  let data = {
    id: id
  }
 
  var c = confirm("Are you sure?")
    if(c){
      this.http.postData("delete-pdf.php",data).subscribe(res =>{
        let result = res.json()
        if(result.message = "success"){
          this.page = 1
          this.getdata(this.page)
          Swal.fire(
            'Good job!',
            'Successfully deleted',
            'success'
          )
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error occured',
            footer: ' '
          })
        }
      })
    }
  
}

report(){
  this.doc = new pdfjs('p','mm','a4');
    var img =  new Image()

    img.src = 'assets/logo/barmm-logo.png'
    this.doc.addImage(img, 'png'  ,8, 10, 48, 48);


    img.src = 'assets/logo/moh-logo.png'
    this.doc.addImage(img, 'jpg'  ,155, 10, 48, 48);
 

    // img.src = 'assets/logo/moh-logo.png'
    // this.doc.addImage(img, 'png'  ,74, 18, 60, 10);

  // img.src = 'assets/logo/moh-logo.png'
  // this.doc.addImage(img, 'jpg'  ,83, 10, 50, 20);

 




this.doc.setFont('Times New Roman','bold');
this.doc.setFontSize(14);
this.doc.text('Republic of the Philippines',this.doc.internal.pageSize.getWidth()/2, 30, { align: "center" });


this.doc.setFont('Times New Roman','normal');
this.doc.setFontSize(14);
this.doc.text('City Government of Cotabato',this.doc.internal.pageSize.getWidth()/2, 35, { align: "center" });




this.doc.setFont('Times New Roman','bold');
this.doc.setFontSize(14);
this.doc.text('Office of the Punong Barangay',this.doc.internal.pageSize.getWidth()/2, 40, { align: "center" }),this.doc.setFontSize(13);


this.doc.setFont('Times New Roman','normal');
this.doc.setFontSize(14);
this.doc.text('Barangay Bagua Mother',this.doc.internal.pageSize.getWidth()/2, 45, { align: "center" });

this.doc.setFont('Times New Roman','normal');
this.doc.setFontSize(14);
this.doc.text('Cotabato City',this.doc.internal.pageSize.getWidth()/2, 50, { align: "center" });

this.doc.setFont('Times New Roman','normal');
this.doc.setFontSize(14);
this.doc.text('Tel No.557-1885',this.doc.internal.pageSize.getWidth()/2, 55, { align: "center" });


this.doc.setFont('Calibri','bold');
this.doc.setFontSize(22);
this.doc.text('___________________________________________' ,this.doc.internal.pageSize.getWidth()/2,63, { align: "center" }),this.doc.setFontSize(12);


this.doc.setFont('Arial Rounded','bold');

if(this.from && this.to && this.certificate){
 
  let data = {
    from: this.from,
    to: this.to
  }
  this.http.postData("get-report.php",data).subscribe(res =>{

  
     let result = res.json()
    



    this.medical.viewcert(this.doc,result,this.from,this.to,this.certificate)


    })


}

}

addcert(){
  this.router.navigate(["admin-home/addcert"])
}

viewrtpcr(item){
  this.service.pdflink = item
  this.router.navigate(['addmedical'])
}

// rtpcr(){
//   this.router.navigate(["admin-home/"])
// }

 




}

