import { Component, OnInit } from '@angular/core';
import pdfjs from 'jspdf';
 import { Router } from '@angular/router'
 import { ServiceService } from '../../../services/service.service'
 import { HttpRequestService} from '../../../services/http-request.service'
import * as moment from "moment"

import Swal from 'sweetalert2'
import qrcode from 'yaqrcode'
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
  constructor(private router: Router,public service: ServiceService,public http: HttpRequestService) {
    this.page = 1
    this.limit = 50
    this.pagebtn = Array()

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

// rtpcr(){
//   this.router.navigate(["admin-home/"])
// }

 




}

