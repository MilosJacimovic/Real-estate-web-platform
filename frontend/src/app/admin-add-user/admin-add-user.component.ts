import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.css']
})
export class AdminAddUserComponent implements OnInit {

  constructor(private router : Router, private service : ServicesService) { }

  ngOnInit(): void {

    this.successMessage = "";
    this.myUsername = localStorage.getItem("myUsername");
    let isAdmin = localStorage.getItem("typeOfUser");
    if(isAdmin !== "admin") this.router.navigate(['/homepage']);
  }

  myUsername;

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
  successMessage;

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

    this.stat = "0";

    this.service.register(this.name, this.surname, this.mail, this.username, this.password, this.confpassword, this.city, this.country, this.type, this.stat).subscribe(( ob ) =>
    {
      if(ob['user'] == 'ok')
      {
        localStorage.setItem('regOk', 'regisok');
        this.successMessage = "Successfully added new user"
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
