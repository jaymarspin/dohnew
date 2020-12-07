import { Component, OnInit } from '@angular/core';
import pdfjs from 'jspdf';
 import { Router } from '@angular/router'
 import { ServiceService } from '../../../services/service.service'
 import { HttpRequestService} from '../../../services/http-request.service'
 

import Swal from 'sweetalert2' 
 
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

  
    fname:any
    lname:any
   age:any
   sex:string
   impression:string
   remarks:string
   address:string
   issued:string


   usershow:boolean = false
  

   userType:any
  constructor(private router: Router,public service: ServiceService,public http: HttpRequestService) {
    this.page = 1
    this.limit = 50
    this.pagebtn = Array()
 

   }
  ngOnInit(): void {
 
    this.userType = localStorage.getItem("role")
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

 
 

// cacheData(item){
//   this.cached = item
//   console.log(this.cached)
// }


reportData:any


delete(id){
  let data = {
    id: id,
    userid: localStorage.getItem("userid")
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
 

viewcert(item){
  if(this.userType == 1){
  this.router.navigate(["certificate/"+item.id])
  }
}

addcert(){
  this.router.navigate(["admin-home/addcert"])
}

viewrtpcr(item,testid){
  if(this.userType == 1 || this.userType == 3){
    delete(this.service.cachedmeddata)
    this.service.pdflink = item
    this.service.testid = testid
    this.router.navigate(['addmedical'])
  }
  
   
}


medicals:any
medicalhistory(item){
  this.medicals = Array()
  this.http.getData("get-medical-history.php?id="+item.id).subscribe(res =>{
    this.medicals = res.json()
  })
}

addInput() {
  alert("awdawd")
}

// rtpcr(){
//   this.router.navigate(["admin-home/"])
// }

 




}

