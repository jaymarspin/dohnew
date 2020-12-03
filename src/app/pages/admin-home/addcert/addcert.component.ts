import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service'
import * as moment from "moment"
import { Router } from '@angular/router'
import pdfjs from 'jspdf';
import { HttpRequestService } from '../../../services/http-request.service'
import Swal from 'sweetalert2' 
import * as $ from 'jquery'
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
  constructor(public service: ServiceService,private router: Router,public request: HttpRequestService) { }

  ngOnInit(): void {
    
    this.reloadPage();
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
  Submitbtn(){
    var loader = document.getElementById("cover-spin")

    loader.style.display = "block"
  
  
    let data = {
      fname: "blank",
      lname: "blank",
      address: "blank",
      pdf: "blank",
      padfArray: this.pdfbase

    }
    
    this.request.postData("add-test.php",data).subscribe(res =>{
      
      console.log(res)
      loader.style.display = "none"
      let result = res.json()
      if(result.message == "success"){
        Swal.fire(
          'Good job!',
          'Successfully Uploaded',
          'success'
        )
      }else{
      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href>Why do I have this issue?</a>'
      })
      }

      
    })
  }


  handleUpload(event) {
     
    $("body").find(".kv-zoom-cache").remove();
    for(var i =0;i < event.target.files.length;i++){
       
      const file = event.target.files[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
          
          this.pdfbase.push({
            base64: reader.result,
            name: file.name
          }) 
          console.log(this.pdfbase)
          
      };

      setInterval((e) =>{
        $(".kv-zoom-thumb").css({display: "none"}) 
      },500)
     
       
     
      
    }

    
    
    
}

 
 
 
}
