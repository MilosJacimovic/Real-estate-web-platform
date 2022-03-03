import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { local } from 'd3';
import { ListingComponent } from '../listing/listing.component';
import { Listing } from '../Model/listing.model';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-mylistings',
  templateUrl: './mylistings.component.html',
  styleUrls: ['./mylistings.component.css']
})
export class MylistingsComponent implements OnInit {

  constructor(private service : ServicesService, private router : Router) { }

  ngOnInit(): void {
    this.noListings = true;
    this.hasPurchases = false;
    this.message = "";
    this.purchasesMessage = "";
    this.myUsername = null;
    let isLogged = localStorage.getItem("LoggedUser");
    if(isLogged !== "logged") this.router.navigate(['/homepage']);
    else
    {
      this.message = localStorage.getItem("listingadded");
      localStorage.removeItem("listingadded");
      this.myUsername = localStorage.getItem("myUsername");
      this.getMyListings();
      this.getMyPurchases();

    }
  }

  message;
  purchasesMessage;
  myUsername;
  myListings;
  myPurchases;
  noListings;
  hasPurchases;

  addNewListing()
  {
    this.router.navigate(['/newlisting']);
  }

  getMyListings()
  {

    this.service.getMyListings(this.myUsername).subscribe((ob) =>
    {
      if(ob)
      {
        this.myListings = ob;
        this.message = "";
        if(this.myListings.length == 0)
        {
          this.message = "You have no listings";
          this.noListings = false;
        }
      }
      else
      {
        this.message = "You have no listings";
      }
    });
  }

  getMyPurchases()
  {
    this.service.getMyPurchases(this.myUsername).subscribe((ob) =>
    {
      if(ob)
      {
        this.myPurchases = ob;
        this.purchasesMessage = "";
        this.hasPurchases = true;
        if(this.myPurchases.length == 0)
        {
          this.purchasesMessage = "You have no purchases";
          this.hasPurchases = false;
        }
      }
      else
      {
        this.purchasesMessage = "You have no purchases";
      }
    });
  }

  navListing(id)
  {
    localStorage.removeItem("viewlisting");
    localStorage.setItem("viewlisting", id);
    this.router.navigate(['/listing']);
  }

}
