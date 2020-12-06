import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service'
import { HttpRequestService} from '../../../services/http-request.service'
import {Location} from '@angular/common';
@Component({
  selector: 'app-viewcert',
  templateUrl: './viewcert.component.html',
  styleUrls: ['./viewcert.component.scss']
})
export class ViewcertComponent implements OnInit {
 
  constructor(private location: Location,public service: ServiceService,public http: HttpRequestService) { }

  ngOnInit(): void {
  }

  goback(){
    this.location.back();
  }

}
