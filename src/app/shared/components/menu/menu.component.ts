 
import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequestService } from '../../../services/http-request.service'

 
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


  @Output() valueChange = new EventEmitter();

  usershow:boolean = false

  reporttype:string
  constructor(private router:Router,private service: HttpRequestService) { }

  ngOnInit(): void {
    if(localStorage.getItem("role")){
      if(localStorage.getItem("role") == "1"){
        this.usershow = true
      }
    }else{
      localStorage.clear()
      this.router.navigate([''])
    }
  }
  menu(nagivate){
  
    this.valueChange.emit(nagivate)
  }
  signout(){
    localStorage.clear()
    this.router.navigate([''])
  }

  

 
}
