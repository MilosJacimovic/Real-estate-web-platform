import { HttpHeaderResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';
import { HeaderComponent } from '../header/header.component';
import { ServicesService } from '../services.service';
import * as _ from 'lodash';
import { Listing } from '../Model/listing.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router : Router, private service : ServicesService) { }

  ngOnInit(): void {
    this.promotedExist = false;
    this.tesst = "../../assets/booka.png"
    this.srcForImage = "http://localhost:4000/static/";
    this.searchListings = null;
    this.searched = false;
    this.error_file_uploaded_message = "";
    this.searchMessage = "";
    this.citySearch = "";
    this.priceSearch = "";
    this.file_uploaded_message = "";
    this.showCharts = 0;
    this.myUsername = localStorage.getItem("myUsername");
    this.isAdmin = localStorage.getItem("typeOfUser");
    this.getAllListings();
    this.getPromotedListing();
    if(this.isAdmin == "admin" || this.isAdmin == "agent")
    {
      this.showCharts = 1;
    }
  
   
    this.imageDataUrl = '../../../../avatar-1625687118435.jpeg'; 
  }

  listings;
  promoted;
  message;
  searchField;
  searched;
  citySearch;
  priceSearch;
  searchListings : Listing[];
  searchMessage;
  srcForImage;
  tesst;
  promotedExist;


  ranNum()
  {
    return Math.floor(Math.random() * (3 - 0 + 1) + 0);
  }

  search()
  {
    this.searchMessage = "";
    if((this.citySearch == undefined || this.citySearch == "") && (this.priceSearch == undefined || this.priceSearch == ""))
    {
      this.searchMessage = "Please enter parameters for search!"
      return;
    }
  

    if(this.citySearch != "" && (this.priceSearch == "" || this.priceSearch == undefined))
    {
      this.service.searchByCity(this.citySearch).subscribe((ob : Listing[]) =>
      {
        if(ob)
        {
          this.searchListings = ob;
          if(this.searchListings.length == 0)
          {
            this.searched = false;
            this.searchMessage = "No listings with that parameter";
          }
        }
        else
        {
          this.searched = false;
          this.searchMessage = "No listings with that parameter";
        }
      });
    }

    if((this.citySearch == "" || this.citySearch == undefined) && this.priceSearch != "")
    {
      this.service.searchByPrice(this.priceSearch).subscribe((ob : Listing[]) =>
      {
        if(ob)
        {
          this.searchListings = ob;
          if(this.searchListings.length == 0)
          {
            this.searched = false;
            this.searchMessage = "No listings with that parameter";
          }
        }
        else
        {
          this.searched = false;
          this.searchMessage = "No listings with that parameter";
        }
      });
    }

    if(this.citySearch != "" && this.priceSearch != "")
    {
      this.service.searchByCityandPrice(this.citySearch, this.priceSearch).subscribe((ob : Listing[]) =>
      {
        if(ob)
        {
          this.searchListings = ob;
          if(this.searchListings.length == 0)
          {
            this.searched = false;
            this.searchMessage = "No listings with that parameter";
          }
        }
        else
        {
          this.searched = false;
          this.searchMessage = "No listings with that parameter";
        }
      });
    }
    this.searched = true;
    
  }

  clear()
  {
    this.citySearch = "";
    this.priceSearch = "";
    this.searched = false;
  }

  getPromotedListing()
  {
    this.service.getPromotedListings().subscribe((ob) =>
    {
      if(ob)
      {
        this.promoted = ob;
        this.promotedExist = true;
        if(this.promoted.length == 0)
        {
          this.promotedExist = false;
        }
      }
      else
      {
        this.promotedExist = false
      }
    });
  }

  navListing(id)
  {
    localStorage.removeItem("viewlisting");
    localStorage.setItem("viewlisting", id);
    this.router.navigate(['/listing']);
  }

  getAllListings()
  {

    this.service.getAllListings().subscribe((ob) =>
    {
      if(ob)
      {
        this.listings = ob;
        if(this.listings.length == 0)
        {
          this.message = "You have no listings";
        }
      }
      else
      {
        this.message = "You have no listings";
      }
    });
  }
  

  myUsername;
  isAdmin;
  imageDataUrl;
  showCharts;
  file_uploaded_message;
  error_file_uploaded_message;
  e;
  
  file_change(e: any)
  {
    this.e = e;
  }

  
  uploadPhoto()
  {
    if(this.e != null)
    {
      this.file_change(this.e);
      this.service.send_photos(this.e, "Admin test").subscribe((ob) =>
      {
        if(ob['status'] == "uploaded") alert('Photo added');
      })
      this.file_uploaded_message = "Successfuly uploaded file";
    }
    else this.error_file_uploaded_message = "Please add files to upload!";

  }

}
