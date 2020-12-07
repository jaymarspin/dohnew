import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service'
import * as moment from "moment"
import { Router } from '@angular/router'
import pdfjs from 'jspdf';
import { HttpRequestService } from '../../../services/http-request.service'
import Swal from 'sweetalert2' 
import * as $ from 'jquery'

import {  ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-addcert',
  templateUrl: './addcert.component.html',
  styleUrls: ['./addcert.component.scss']
})
export class AddcertComponent implements OnInit {
fname:any
lname:any
name:any
age:any
sex:any
address:any
impression:any
remarks:any
pdf:any
pdfdata:any
pdfbase:any = Array()

doc:any
   baseY:any = 150
   cached:any


   loaded:boolean = false 
   datecollected:any = ""
  constructor( private cdr: ChangeDetectorRef,public service: ServiceService,private router: Router,public request: HttpRequestService) { }

  ngOnInit(): void {
    // setTimeout(e =>{
    //   this.cdr.detectChanges();
    // },1000)
    $(() =>{
      
       
      $.getScript("assets/bootstrap-fileinput/js/fileinput.min.js" )
      
     
    })
    
    // this.reloadPage();
    // $(e =>{
    //   $("#input-b4").css({
    //     "opacity": 0,
    //     "width": "100%",
    //     "height": "60px",
    //     "top": "0px",
    //     "position": "relative",
    //     "margin-top": "-100px",
    //     "cursor": "pointer"
    //   })

    //   $(".file-caption").css({
    //     display: "none"
    //   })

    //   $(".input-group-btn").css({
    //     display: "block",
    //     width: "100%",
    //     "text-align": "center"
    //   })

    //   $(".file-drop-zone-title").css({
    //     display: "none"
    //   })

    //   $(".fileinput-remove").css({
    //     display: "none"
    //   })

    //   $(".btn-file span").html("CLICK HERE TO SELECT FOR RT-PCR PDF NOW")
    //   $(".btn-file span").css({
    //     position: "relative",
    //     "top": "20px",
    //     "font-size": "25px",
       
    //   })
    //   $(".btn-primary").css({
    //     background: "none",
    //     color: "#333",
    
    //     "border": "1px solid #ccc",
    //     "border-radius": "10px"
    //   })


    //   $(".btn-primary").mouseover(e =>{
    //     $(this).animate({
    //       "background-color": "#ccc"
    //     },500)
    //   })

    //   $(".file-caption-name, .fileinput-cancel").css({"display": "none"})

     
    // })

    // $(() =>{
    //   $("button.fileinput-remove, .hidden-xs").click(() =>{
    //     alert("awdawdwa")
    //     // this.pdfbase = Array()
    //   })
    // })
  }

  reloadPage() {
    // The last "domLoading" Time //
    var currentDocumentTimestamp =
    new Date(performance.timing.domLoading).getTime();
    // Current Time //
    var now = Date.now();
    // Ten Seconds //
    var tenSec = 10 * 1000;
    // Plus Ten Seconds //
    var plusTenSec = currentDocumentTimestamp + tenSec;
    if (now > plusTenSec) {
    location.reload();
    } else {}
 
    }
    passer = Array()
    upload(data){
      this.request.postData("add-test.php",data).subscribe(res =>{
        
        let result = res.json()
         
        if(result.message == "success"){
          this.passer.push(1)
        }else{
          this.passer.push(0)
        }
        this.c += 1
                if(this.c >= this.pdfbase.length){
                  this.loader.style.display = "none"
          let t = $.inArray( "John", this.passer)+""
          if(parseInt(t) <= -1){
            Swal.fire(
                    'Good job!',
                    'Successfully Uploaded',
                    'success'
                  )
                  this.router.navigate(["admin-home"])
          }else{
   Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: ' '
      })
          }
        }
      })

      
    }
    loader:any
    c:any = 0
  Submitbtn(){

   
    if($("#datecollected").val().trim() != "" && this.pdfbase.length > 0 && $("#dateexpiry").val().trim() != ""){
      this.loader = document.getElementById("cover-spin")

      this.loader.style.display = "block"
       var c = 0;
      for(var i =0;i < this.pdfbase.length;i++){
        
        let tmp = Array()
        tmp.push(this.pdfbase[i])
        
          
        let data = {
          fname: "blank",
          lname: "blank",
          address: "blank",
          pdf: "blank",
          userid: localStorage.getItem("userid"),
          date_collected: $("#datecollected").val(),
          date_expiry: $("#dateexpiry").val(),
          padfArray: tmp
    
        }
          this.upload(data)
        
  
         
        
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter date collected,expiration and make sure you have at least one RT-PCR ready for upload',
        footer: ' '
      })
    }
    
     

    
    // let data = {
    //   fname: "blank",
    //   lname: "blank",
    //   address: "blank",
    //   pdf: "blank",
    //   padfArray: this.pdfbase

    // }
    
    // this.request.postData("add-test.php",data).subscribe(res =>{
      
      
    //   loader.style.display = "none"
    //   let result = res.json()
    //   if(result.message == "success"){
    //     Swal.fire(
    //       'Good job!',
    //       'Successfully Uploaded',
    //       'success'
    //     )
    //   }else{
      
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Something went wrong!',
    //     footer: '<a href>Why do I have this issue?</a>'
    //   })
    //   }

      
    // })
  }


  handleUpload(event) {
     $(".harang").css({display: "none"})

     $(".fileinput-remove, fileinput-remove-button").click(() =>{
      $(".harang").css({display: "block"})
      delete(this.pdfbase)
      this.pdfbase = Array()
     })
      
    for(var i =0;i < event.target.files.length;i++){
       
      const file = event.target.files[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
          
          this.pdfbase.push({
            base64: reader.result,
            name: file.name
          }) 
          
          
      };

      setInterval((e) =>{
        $(".kv-zoom-thumb").css({display: "none"}) 
      },500)
     
       
     
      
    }

    
    
    
}

 
 
 
}
