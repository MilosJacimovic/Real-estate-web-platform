import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { User } from '../Model/user.model';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router :  Router, private service : ServicesService) { }

  ngOnInit(): void {
    if(localStorage.getItem("LoggedUser") === "logged") this.router.navigate(["/homepage"]);
  }

  message : string;
  regOk : string;
  username : string;
  password : string;

  login()
  {
    this.message = "";

    if ((this.username == "" || this.username == undefined) || this.password == "" || this.password == undefined) {
      this.regOk = null;
      this.message = "You must enter all data";
      return;
    }

    this.service.login(this.username, this.password).subscribe((user : User)=>
    {
      if(user)
      {
        if(user.status != '1')
        {
          this.regOk = null;
          this.regOk = "Please wait while admin accepts your account."
        }
        else
        {
          localStorage.setItem("typeOfUser", user.type);
          localStorage.setItem("myUsername", user.username);
          localStorage.setItem("LoggedUser", "logged");
          this.regOk = null;
          localStorage.removeItem('regOk');
          this.router.navigateByUrl("/homepage");
          window.location.reload();
        }
      }
      else
      {
        this.regOk = null;
        this.message = "You entered wrong credentials";
      }
    });
   
  }

  register()
  {
    this.router.navigate(['/register']);
  }
}
