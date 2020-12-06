import { Component, OnInit } from '@angular/core'; 
 import { Router } from '@angular/router'
 import { ServiceService } from '../../../services/service.service'
 import { HttpRequestService} from '../../../services/http-request.service'
 

import Swal from 'sweetalert2' 
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  customers = 6546798
  user = Array()
  userCount:number
 



   search:string
   searchpass:boolean = false


   page:number
   limit:number
   pagebtntmp:any
   pagebtn:any
 

    fname:any
    lname:any
    username:any
    password:any
    usertype:any = 2
 

  constructor(private router: Router,public service: ServiceService,public http: HttpRequestService) {
    this.page = 1
    this.limit = 10
    this.pagebtn = Array()

   }
  ngOnInit(): void {


    if(localStorage.getItem("role") == "1"){
      this.getdata(this.page)
    }else{
      this.router.navigate(["admin-home/certlisting"])
    }
    


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
    this.http.getData("search-user.php?search="+this.search).subscribe(res =>{
      console.log(res)
      this.user = res.json()
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
    this.http.getData("get-users.php?limit="+this.limit+"&page="+pager).subscribe(res =>{
      console.log(res.json())
      this.user = res.json().users
      this.userCount = res.json().user_count


      loader.style.display = "none"

      this.pagebtntmp =  this.userCount / this.limit
      for(var i = 1;i < this.pagebtntmp + 1;i++){
        this.pagebtn.push(i)
      }
    })
  }

  pager(page){
    this.page = page
    this.getdata(page)
  }
 adduser(){
  var loader = document.getElementById("cover-spin")
  loader.style.display = "block"
   let data = {
     fname: this.fname,
     lname: this.lname,
     username: this.username,
     password: this.password,
     usertype: this.usertype
   }
   console.log(data)
   
   this.http.postData("add-user.php",data).subscribe(res =>{
     console.log(res)
     let result = res.json()

     if(result.message == "success"){
       this.fname = ""
       this.lname = ""
       this.username = ""
       this.password = ""
        this.page = 1
       this.getdata(this.page)

       Swal.fire(
        'Good job!',
        'Successfully Uploaded',
        'success'
      )

     }else{
      


     }
     loader.style.display = "none"
   })

 }

 delete(id){
  
  let data = {
    id: id,
    userid: localStorage.getItem("userid")
  }
   this.http.postData("delete-user.php",data).subscribe(res =>{
    let result = res.json()

    if(result.message == "success"){
      Swal.fire(
        'Good job!',
        'Successfully Deleted',
        'success'
      )
      this.page = 1
       this.getdata(this.page)
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error Occured!',
        footer: ''
      })
    }
   })

 }

}

