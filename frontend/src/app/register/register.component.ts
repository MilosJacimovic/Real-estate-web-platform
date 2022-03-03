import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Model/user.model';
import { ServicesService } from '../services.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router : Router, private service : ServicesService) { }

  ngOnInit(): void {
    this.fileInput = null;
    this.message = "";
    if(localStorage.getItem("LoggedUser") === "logged") this.router.navigate(["/homepage"]);
  }

  name : string;
  surname : string;
  mail : string;
  password : string;
  username : string;
  confpassword : string;
  city : string;
  country : string;
  message : string;
  type : string;
  stat : string;
  fileInput;
  imageError: string;
  cardImageBase64 : string;


  file_change(fileInput: any)
  {
    this.fileInput = fileInput;

  }

  register()
  {
    if (this.name == null || this.name == undefined || this.name == "")
    {
      this.message = "You must enter all data"
      return;
    }
    
    if (this.surname == null || this.surname == undefined || this.surname == "")
    {
      this.message = "You must enter all data"
      return;
    }
    if (this.username == null || this.username == undefined || this.username == "")
    {
      this.message = "You must enter all data"
      return;
    }
    if (this.password == null || this.password == undefined || this.password == "")
    {
      this.message = "You must enter all data"
      return;
    }
    if (this.confpassword == null || this.confpassword == undefined || this.confpassword == "")
    {
      this.message = "You must enter all data"
      return;
    }
    if (this.city == null || this.city == undefined || this.city == "")
    {
      this.message = "You must enter all data"
      return;
    }

    if (this.country == null || this.country == undefined || this.country == "")
    {
      this.message = "You must enter all data"
      return;
    }

    if (this.mail == null || this.mail == undefined || this.mail == "")
    {
      this.message = "You must enter all data"
      return;
    }

  

    this.type = "user";
    this.stat = "0";

    this.service.register(this.name, this.surname, this.mail, this.username, this.password, this.confpassword, this.city, this.country, this.type, this.stat).subscribe(( ob ) =>
    {
      if(ob['user'] == 'ok')
      {
        localStorage.setItem('regOk', 'regisok');
        this.router.navigate(['/login']);
      }
      else
      {
        if(ob['user'] == 'Passwords dont match!') this.message = "Passwords dont match!";
        if(ob['user'] == 'Username is already taken!') this.message = "Username is already taken!";
        if(ob['user'] == 'Email is already taken!') this.message = "Email is already taken!";
      }
    });
   

  }



}
