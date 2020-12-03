import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { of } from 'rxjs';
import Swal from 'sweetalert2'
import { HttpRequestService } from '../../services/http-request.service'
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  key = 1000
  username:string = ""
  password:string = ""

  constructor(private router: Router,private service: HttpRequestService) { }

  ngOnInit(): void {
    if(localStorage.getItem("userid")){
      this.router.navigate(['admin-home'])
    }

  }

  

  login(){




        let data = {
          username: this.username,
          password: this.password,
        
        }


        var loader = document.getElementById("cover-spin")
        loader.style.display = "block"
        this.service.postData("signin.php",data).subscribe(res =>{
         
          let message = res.json().message
           
          if(message == "success"){



      
            this.service.userid = res.json().userid
            localStorage.setItem("userid",res.json().userid);
            localStorage.setItem("role",res.json().role);
            this.router.navigate(['admin-home'])




          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Username or password is invalid',
              footer: '<span>Try again!</span>'
            })
          }

          loader.style.display = "none"
        })

      }



  }


