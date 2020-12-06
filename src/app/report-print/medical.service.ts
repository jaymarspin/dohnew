import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import {ServiceService} from '../services/service.service'
 
import pdfjs from 'jspdf';
import autoTable from'jspdf-autotable';
 import {PrintService} from '../services/print.service'
@Injectable({
  providedIn: 'root'
})
export class MedicalService {
  doc:any
  baseY:number
  constructor(public service: ServiceService,public router: Router, private printservice: PrintService) {

    this.baseY = 80

   }

  viewcert(doc,result,from,to,type){
    this.doc = doc

    console.log(result)
    let cert = "Medical Certificate"
 
     
      var columns = [

        {title: "Full Name", key: "fullname"},
         
        {title: "Impression", key: "impression"},
        {title: "Remarks", key: "remarks"},
        {title: "Date Issued", key: "issued"},
        {title: "Date Created", key: "date_created"},
         
        
    ];
   

    let text = 'List of the People who have received '+cert+' from '+this.printservice.getIssuedDate(from)+" to "+this.printservice.getIssuedDate(to)+""
    // this.doc.setFontSize(12)
    this.doc.setFont('Times New Roman','normal');

    this.doc.setFontSize(13);
    this.pdfbuffer(20,text,150)
    this.baseY += 10

    autoTable(this.doc, { columns,
      body: result,startY: this.baseY,columnStyles:{
        0: {cellWidth: 30},
        1: {cellWidth: 50},
        2: {cellWidth: 50},
        3: {cellWidth: 25},
        4: {cellWidth: 25},
     
      }

     },)

    this.baseY = 80
    this.service.pdfdata = this.doc.output("blob")
    this.router.navigate(['report'])

  }

  pdfbuffer(baseX,text,limit){
    let tmpbaseX = baseX
    let storeText = "";
    var splitter = text.split(" ")
    for(var i = 0; i < splitter.length;i++){

      let space = this.doc.getTextDimensions(splitter[i]).w
      storeText+=splitter[i]
      if(this.doc.getTextDimensions(storeText).w > limit){
        this.baseY += 5
        storeText = ""
        baseX = tmpbaseX
      }
      let tmp = 1 + space

      console.log(splitter[i])
       this.doc.text(splitter[i],baseX,this.baseY)
      baseX += tmp
    }
  }

}
