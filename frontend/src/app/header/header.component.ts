import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  is_logged;
  type;


  constructor(private router: Router ) { }

    ngOnInit(): void {

      
      this.type = localStorage.getItem("typeOfUser");
      this.is_logged = localStorage.getItem("LoggedUser");
  }
 
  navHome()
  {
    this.router.navigate(["/homepage"]);
  }

  navMyListings()
  {
    this.router.navigate(["/mylistings"]);
  }

  navApproveListing()
  {
    this.router.navigate(["/manipulate"]);
  }

  refresh()
  {
    window.location.reload();
  }

  navProfile()
  {
    this.router.navigate(['/profile']);
  }

  navAdmin()
  {
    this.router.navigate(['/admin']);
  }

  login()
  {
    this.router.navigate(["/login"]);
    this.ngOnInit();
  }

  logout()
  {
    localStorage.clear();
    this.type = "guest";
    this.is_logged = "false";
    this.router.navigate(["/landing"]);
    this.ngOnInit();
  }


}
