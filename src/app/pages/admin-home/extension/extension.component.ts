import { Component, OnInit } from '@angular/core';
 import { Router } from '@angular/router'
 import { ServiceService } from '../../../services/service.service'
 import { HttpRequestService} from '../../../services/http-request.service'
 
 
import Swal from 'sweetalert2' 

import {MedicalService}  from '../../../report-print/medical.service'
@Component({
  selector: 'app-extension',
  templateUrl: './extension.component.html',
  styleUrls: ['./extension.component.scss']
})
export class ExtensionComponent  implements OnInit {
  customers = 6546798
  medicals = Array()
  medicalCount:number
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


   
   


   from:any

   to:any

   userType:any
   filter:any
  constructor(private medical: MedicalService,private router: Router,public service: ServiceService,public http: HttpRequestService) {
    this.page = 1
    this.limit = 50
    this.filter = 1
    this.pagebtn = Array()
    

   }
  ngOnInit(): void {
 
    this.userType = localStorage.getItem("role")
    this.getdata(this.page)


  }
 



  rtpcr(pdf){ 
    this.service.cert = pdf
   this.router.navigate(["certview"])
    // shell.openExternal(this.http.server+pdf)
  

  }

  changedfilter(e){
    this.filter = e.target.value
    this.page = 1
    this.getdata(this.page)
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
    this.http.getData("search-medical.php?search="+this.search).subscribe(res =>{
      console.log(res)
      this.medicals = res.json()
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
    this.http.getData("get-medical-list.php?limit="+this.limit+"&page="+pager+"&extension="+this.filter).subscribe(res =>{
      console.log(res)
      this.medicals = res.json().medicals
      this.medicalCount = res.json().medical_count


      loader.style.display = "none"

      this.pagebtntmp =  this.medicalCount / this.limit
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
    id: id,
    userid: localStorage.getItem("userid")
  }
 
  var c = confirm("Are you sure?")
    if(c){
      this.http.postData("delete-medical.php",data).subscribe(res =>{
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

 



}

