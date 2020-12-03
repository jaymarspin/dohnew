import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from "moment"
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {

  
  timestamp:any
  usershow:boolean = false
  constructor(private router:Router) { }
  @Output() valueChange = new EventEmitter();
  ngOnInit(): void {
    this.timestamp = moment().format('LLLL');
    setInterval(() =>{
      this.timestamp = moment().format('LLLL');
    },60000)


    if(localStorage.getItem("role")){
      if(localStorage.getItem("role") == "1"){
        this.usershow = true
      }
    }
  }
  head(){


    localStorage.clear();
   this.router.navigate(['sign'])


  }

  menu(nagivate){
  
    this.valueChange.emit(nagivate)
  }

  out(){

    localStorage.clear();
    this.router.navigate(['sign'])
   }
}
