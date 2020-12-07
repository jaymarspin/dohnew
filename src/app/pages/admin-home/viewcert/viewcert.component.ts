import { Component, OnInit, HostListener} from '@angular/core';
import { ServiceService } from '../../../services/service.service'
import { HttpRequestService} from '../../../services/http-request.service'
import {Location} from '@angular/common';
@Component({
  selector: 'app-viewcert',
  templateUrl: './viewcert.component.html',
  styleUrls: ['./viewcert.component.scss']
})
export class ViewcertComponent implements OnInit {
  ESCAPE_KEYCODE = 27;
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode === this.ESCAPE_KEYCODE) {
        this.goback()
    }
}
  constructor(private location: Location,public service: ServiceService,public http: HttpRequestService) { }

  ngOnInit(): void {
  }

  goback(){
    this.location.back();
  }

}
