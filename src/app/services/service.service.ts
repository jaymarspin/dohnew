import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  doc:any 
  pdfdata:any
  cert:any
  editcert:any
  viewcert:any


  pdflink:any
  testid:any

 cachedmeddata:any
 editbool:boolean = false
  constructor() { }
}
