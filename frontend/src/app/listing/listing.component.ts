import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Listing } from '../Model/listing.model';
import { User } from '../Model/user.model';
import { ServicesService } from '../services.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';  

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
 
  constructor(private service : ServicesService, private router : Router, config: NgbCarouselConfig) {
    config.interval = 5000;  
    config.wrap = true;  
    config.keyboard = false;  
    config.pauseOnHover = false;  
   }

  ngOnInit() {
    this.buyingMessage = "";
    this.potentialBuyers = new Array;
    this.noPotentialBuyers = false;
    this.canIBuy = true;
    this.warningMessage = "You have already requested to buy this listing"
    this.hasBeenBought = false;
    this.srcForImage = "http://localhost:4000/static/";
    this.myUsername = localStorage.getItem("myUsername");
    this.getListing(localStorage.getItem("viewlisting"));
   
  }

  listing;
  message;
  hasBeenBought;
  myUsername;
  canIBuy;
  buyingMessage;
  warningMessage;
  noPotentialBuyers;
  wantsToBuy;
  soldMessage;
  whoIsBuyer;
  srcForImage;
  BuyerMessage;
  potentialBuyers : User[];


  getListing(id)
  {
    this.service.getListing(id).subscribe((ob) =>
    {
      if(ob)
      {
        this.listing = ob;
        if(this.listing.buyer != '')
        {
          this.hasBeenBought = true;
        }
        this.canYouBuy();
        this.buyersList();
        this.whoBought();
      }
      else
      {
        this.message = "You have no listings";
      }
    });
  }

  whoBought()
  {
    if(this.listing.buyer != '' && this.listing.owner == this.myUsername) this.whoIsBuyer = "You have sold your " + this.listing.type + " to " + this.listing.buyer;
    this.BuyerMessage = "You have bought this listing"
  }
  
  buyersList()
  {
   
    for(let i = 0; i < this.listing.wantToBuy.length; i++)
    {
      this.service.getOneUser(this.listing.wantToBuy[i]).subscribe((ob : User)=>
      {
        if(ob)
        {
          this.potentialBuyers[i] = ob;
        }
        else
        {
          alert("nema")
        }
      });
    }

  }

  acceptOffer(uname)
  {
    this.service.buyListing(this.listing.description, uname).subscribe((ob) =>
    {
      if(ob['bought'] == "ok") this.soldMessage = "Successfully sold!";
      this.ngOnInit();
    })
  }

  canYouBuy()
  {
    for (let i = 0; i < this.listing.wantToBuy.length; i++) {
      if(this.myUsername == this.listing.wantToBuy[i])
      {
        this.canIBuy = false;
        break;
      }
    }
  }
  buyRequest(id)
  {

    this.service.wantToBuy(this.myUsername , id).subscribe((ob) =>
    {
      if(ob['status'] == "ok") this.buyingMessage = "Successfully requested to buy this listing!";
    })
  }

 
}