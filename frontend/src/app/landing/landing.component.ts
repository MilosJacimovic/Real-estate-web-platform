import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("LoggedUser") === "logged") this.router.navigate(["/homepage"]);
  }

  navRegister()
  {
    this.router.navigate(["/register"]);
  }

  navLogin()
  {
    this.router.navigate(["/login"]);
  }

  navHome()
  {
    this.router.navigate(["/homepage"]);
  }
}
