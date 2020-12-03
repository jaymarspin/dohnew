import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service'
import pdfjs from 'jspdf';
 import { Router,ActivatedRoute} from '@angular/router'
 import { HttpRequestService} from '../../services/http-request.service'
 import qrcode from 'yaqrcode'
import * as moment from "moment"

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  title = 'app';
  elementType = 'url';
  value = 'Techiediaries';


  doc:any
   baseY:any = 150
   cached:any


   fname:string
   lname:string
   age:string
   sex:string
   issuing:string
   address:string
   impression:string
   remarks:string
   filename:string

   id:number

   usershow:boolean = false
  constructor(private activateRoute: ActivatedRoute,public service: ServiceService,public request: HttpRequestService,private router: Router)

  {


    this.fname = this.activateRoute.snapshot.paramMap.get("fname")
    this.lname = this.activateRoute.snapshot.paramMap.get("lname")
    this.age = this.activateRoute.snapshot.paramMap.get("age")
    this.sex = this.activateRoute.snapshot.paramMap.get("sex")
    this.issuing = this.activateRoute.snapshot.paramMap.get("issuing")
    this.address = this.activateRoute.snapshot.paramMap.get("address")
    this.impression = this.activateRoute.snapshot.paramMap.get("impression")
    this.remarks = this.activateRoute.snapshot.paramMap.get("remarks")
    this.filename = this.activateRoute.snapshot.paramMap.get("filename")

  }



//   address: "this.activateRoute.snapshot.paramMap.get("id")"
// age: "43"
// filename: "5fba59c4c1172-1606048196-755.pdf"
// fname: "6464564"
// impression: "this.activateRoute.snapshot.paramMap.get("id")"
// issuing: "2020-11-10"
// lname: "456546"
// mname: "awdawd"
// remarks: "this.activateRoute.snapshot.paramMap.get("id")"
// sex: "MALE"
  ngOnInit(): void {

    if(localStorage.getItem("role") == "1"){
       
    }else{
      this.router.navigate(["admin-home/certlisting"])
    }

    var loader = document.getElementById("cover-spin")

    loader.style.display = "block"
    this.id = parseInt(this.activateRoute.snapshot.paramMap.get("id"))
    this.request.getData("get-medical.php?id="+this.id).subscribe(res =>{
      let result = res.json()
      this.fname = result.fname
      this.lname = result.lname
      this.age = result.age
      this.sex = result.sex
      this.address = result.address
      this.issuing = result.issuing
      this.impression = result.impression
      this.remarks = result.remarks
      this.filename = result.filename

  
      this.viewCert()

      loader.style.display = "none"
    },err =>{

      alert("error occured")
      loader.style.display = "none"
    } )

  }

  print(){
    window.print()

  }


  save(){
    this.service.doc.save("randallpdf.pdf")
  }

  ngOnDestroy(){
  }




  testAfterPrint(){
    console.log("randall")

    // console.log(event)
    // this.service.addReport(this.service.reportData)
  }
  goCert(){



      this.service.doc = this.doc



  }

  viewCert() {

    this.doc = new pdfjs('p','mm','a4');

    var img = new Image()
    img.src = 'assets/1200px-Seal_of_Bangsamoro.png'
    this.doc.addImage(img, 'png'  ,18, 14, 22, 22);



    img.src = 'assets/Ministry_of_Health_of_Bangsamoro_seal.png'
    this.doc.addImage(img, 'png'  ,175, 14, 22, 22);






    this.doc.setFont('Helvetica','normal');
    this.doc.setFontSize(12);
    this.doc.text('Republic of the Philippines',this.doc.internal.pageSize.getWidth()/2, 18, { align: "center" });

    this.doc.setFont('Helvetica','bold');
    this.doc.setFontSize(17);
    this.doc.setTextColor(6, 94, 25);
    this.doc.text('MINISTRY OF HEALTH',this.doc.internal.pageSize.getWidth()/2, 25, { align: "center" });

    this.doc.setFont('Helvetica','bold');
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(11);
    this.doc.text('Bangsamoro  Autonomous Region in Muslim Mindanao',this.doc.internal.pageSize.getWidth()/2, 30, { align: "center" });


    this.doc.setFont('Helvetica','normal');
    this.doc.setFontSize(11);
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('Bangsamoro Government Center, BARMM Complex, RH7, Cotabato City',this.doc.internal.pageSize.getWidth()/2, 35, { align: "center" });

    this.doc.setFont('Helvetica','normal');
    this.doc.setFontSize(11);
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('Tel:(064) 552-0086, 421-3988 Fax: (064) 421-6842 ',this.doc.internal.pageSize.getWidth()/2, 40, { align: "center" });


    this.doc.setFont('Helvetica','normal');
    this.doc.setFontSize(11);
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('E-mail:_______________________FB Page:_____________________',this.doc.internal.pageSize.getWidth()/2, 45, { align: "center" });

    this.doc.setFont('Helvetica','normal');
    this.doc.setFontSize(11);
    this.doc.setTextColor(0, 102, 255);
    this.doc.text('moh@gbangsamoro.gov.ph',57,45);

    this.doc.setFont('Helvetica','normal');
    this.doc.setFontSize(11);
    this.doc.setTextColor(0, 102, 255);
    this.doc.text('facebook.com/moh.barmm',122,45);



    // this.doc.setFont('Helvetica','normal');
    // this.doc.setFontSize(11);
    // this.doc.setTextColor(0, 0, 0);
    // this.doc.text('     ___________________              _______________________',this.doc.internal.pageSize.getWidth()/2, 45, { align: "center" });


    this.doc.setFont('Helvetica','bold');
    this.doc.setFontSize(11);
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('_________________________________________________________________________________________',this.doc.internal.pageSize.getWidth()/2, 50, { align: "center" });

    this.doc.setFont('Helvetica','bold');
    this.doc.setFontSize(11);
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('_________________________________________________________________________________________',this.doc.internal.pageSize.getWidth()/2, 52, { align: "center" });

    this.doc.setFont('Helvetica','bold');
    this.doc.setFontSize(11);
    this.doc.setTextColor(6, 94, 25);
    this.doc.text('_________________________________________________________________________________________',this.doc.internal.pageSize.getWidth()/2, 50.5, { align: "center" });


    this.doc.setFont('Helvetica','bold');
    this.doc.setFontSize(11);
    this.doc.setTextColor(6, 94, 25);
    this.doc.text('_________________________________________________________________________________________',this.doc.internal.pageSize.getWidth()/2, 51, { align: "center" });

    this.doc.setFont('Helvetica','bold');
    this.doc.setFontSize(11);
    this.doc.setTextColor(6, 94, 25);
    this.doc.text('_________________________________________________________________________________________',this.doc.internal.pageSize.getWidth()/2, 51.5, { align: "center" });


    this.doc.setFont('Helvetica','bold');
    this.doc.setFontSize(28);
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('MEDICAL CERTIFICATE',this.doc.internal.pageSize.getWidth()/2, 70, { align: "center" });


    this.doc.setFont('Helvetica','normal');
    this.doc.setFontSize(11);
    this.doc.setTextColor(0, 0, 0);
    this.doc.text(moment(this.issuing,"YYYYMMDD").format('LL'),20,95);




    this.doc.setFont('Helvetica','normal');
    this.doc.setFontSize(11);
    this.doc.setTextColor(0, 0, 0);
    this.doc.text("Name            :   "+this.fname+" "+this.lname+"    ",20,110);


    this.doc.setFont('Helvetica','normal');
    this.doc.setFontSize(11);
    this.doc.setTextColor(0, 0, 0);
    this.doc.text("Age :  "+this.age+"",160,110);


    this.doc.setFont('Helvetica','normal');
    this.doc.setFontSize(11);
    this.doc.setTextColor(0, 0, 0);
    this.doc.text("Sex               :   "+this.sex+"",20,120);





  




this.baseY -= 20
let tmp = this.baseY
    this.doc.setFont('Helvetica','normal');
    this.doc.setFontSize(11);
    this.doc.setTextColor(0, 0, 0);
    // this.doc.text("Address        :   "+this.address+"   ",20,135);
    var text = ""+this.address+"";
    this.pdfbuffer(48,text,this.baseY)


    this.doc.setFont('Helvetica','normal');
    this.doc.setFontSize(11);
    this.doc.setTextColor(0, 0, 0);
    this.doc.text( "Address        :                      ",20,tmp);


    this.baseY +=15

    
      tmp = this.baseY
    

    // this.doc.setFont('Helvetica','bold');
    // this.doc.setFontSize(11);
    // this.doc.setTextColor(0, 0, 0);
    // this.doc.text( "                          "+this.impression+"",20,145);
    
    this.doc.setFont('Helvetica','bold');
    this.doc.setFontSize(11);
    this.doc.setTextColor(0, 0, 0);
    var text = ""+this.impression+"";
  this.pdfbuffer(48,text,120)
 
  this.doc.setFont('Helvetica','normal');
    this.doc.setFontSize(11);
    this.doc.setTextColor(0, 0, 0);
    this.doc.text( "Impression    :                      ",20,tmp);





    // this.doc.setFont('Helvetica','bold');
    // this.doc.setFontSize(11);
    // this.doc.setTextColor(0, 0, 0);
    // this.doc.text("                          "+this.remarks+"",20,165);
    this.baseY += 20
    tmp = this.baseY
    this.doc.setFont('Helvetica','bold');
    this.doc.setFontSize(11);
    this.doc.setTextColor(0, 0, 0);
    var text = ""+this.remarks+"";
  this.pdfbuffer(48,text,115)

  this.doc.setFont('Helvetica','normal');
  this.doc.setFontSize(11);
  this.doc.setTextColor(0, 0, 0);
  this.doc.text("Remarks       :                     ",20,tmp);


  
     
  this.baseY += 40
    this.doc.setFont('Helvetica','bold');
    this.doc.setFontSize(11);
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('Amirel S. Usman, MD, DipHm, DPCHA, CHA',20,this.baseY);

    this.baseY +=5
    this.doc.setFont('Helvetica','normal');
    this.doc.setFontSize(11);
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('Head, Regional Epidemiology Surveillance Unit',20,this.baseY);


    this.baseY += 5
    this.doc.setFont('Helvetica','normal');
    this.doc.setFontSize(11);
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('Head, Disaster Risk Reduction Management- Health',20,this.baseY);

    this.baseY += 5
    this.doc.setFont('Helvetica','normal');
    this.doc.setFontSize(11);
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('Minister of Health- BARMM',20,this.baseY);

    this.baseY -= 55
    this.doc.setFont('Helvetica','bold');
    img.src = 'assets/esig.png'
    this.doc.addImage(img, 'png'  ,25, this.baseY, 45, 30);


     let base64 = qrcode(this.request.server+"pdfs/"+this.filename, {
          size: 500
      });

      this.baseY += 10
      this.doc.addImage(base64, 'png'  ,145, 230, 45, 45);





  this.service.pdfdata = this.doc.output("blob")
  }




    pdfbuffer(baseX,text,limit){
      let tmpbaseX = baseX
      let storeText = "";
      var splitter = text.split(" ")
      for(var i = 0; i < splitter.length;i++){

        let space = this.doc.getTextDimensions(splitter[i]).w
        storeText+=splitter[i]
        console.log(this.doc.getTextDimensions(storeText).w)
        if(this.doc.getTextDimensions(storeText).w > limit){
          this.baseY += 5
          storeText = ""
          baseX = tmpbaseX
        }
        let tmp = 1 + space
        // console.log(splitter[i]+" ")
        this.doc.text(splitter[i],baseX,this.baseY)
        baseX += tmp
      }
    }



}