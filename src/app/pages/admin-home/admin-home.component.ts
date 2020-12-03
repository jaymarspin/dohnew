import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import {AutologoutService} from '../../services/autologout.service'
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  constructor(private router: Router,private autologout: AutologoutService) { }

  ngOnInit(): void {
    this.autologout

    if(!localStorage.getItem("userid")){
      this.router.navigate(['signin'])
    }
    // else if(localStorage.getItem("userid")){
    //   this.router.navigate(['client-home'])
    // }
  }

  route($event){

    this.router.navigate(["admin-home/"+$event]);


  }

}
