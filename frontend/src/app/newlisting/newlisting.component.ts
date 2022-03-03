import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-newlisting',
  templateUrl: './newlisting.component.html',
  styleUrls: ['./newlisting.component.css']
})
export class NewlistingComponent implements OnInit {

  constructor(private router : Router, private service : ServicesService) {}

  ngOnInit(): void {
    this.myUsername = null;
    let isLogged = localStorage.getItem("LoggedUser");
    if(isLogged !== "logged") this.router.navigate(['/homepage']);
    else
    {
      this.myUsername = localStorage.getItem("myUsername");
    }
  }

  message;
  myUsername;
  description;
  city;
  municipality;
  address;
  number;
  type;
  numoflevels;
  level;
  size;
  numofrooms;
  furnished;
  price;
  owner;
  e;
  file_uploaded_message;
  error_file_uploaded_message;
  id;

  file_change(e: any)
  {
    this.e = e;
  }


  uploadPhoto(idd)
  {
    if(this.e != null)
    {
      this.file_change(this.e);
      this.service.send_photos(this.e, idd).subscribe((ob) =>
      {
        if(ob['status'] == "uploaded") alert('Photo added');
      })
      this.file_uploaded_message = "Successfuly uploaded file";
    }
    else this.error_file_uploaded_message = "Please add files to upload!";

  }

  addNewListing()
  {
    if (this.description == null || this.description == undefined || this.description == "")
    {
      this.message = "You must enter all data"
      return;
    }
    
    if (this.city == null || this.city == undefined || this.city == "")
    {
      this.message = "You must enter all data"
      return;
    }
    if (this.municipality == null || this.municipality == undefined || this.municipality == "")
    {
      this.message = "You must enter all data"
      return;
    }
    if (this.address == null || this.address == undefined || this.address == "")
    {
      this.message = "You must enter all data"
      return;
    }
    if (this.number == null || this.number == undefined || this.number == "")
    {
      this.message = "You must enter all data"
      return;
    }
    if (this.type == null || this.type == undefined || this.type == "")
    {
      this.message = "You must enter all data"
      return;
    }

    if (this.numoflevels == null || this.numoflevels == undefined || this.numoflevels == "")
    {
      this.message = "You must enter all data"
      return;
    }
    else
    {
      if(this.type == "house") this.level = this.numoflevels;
    }

    if (this.level == null || this.level == undefined || this.level == "")
    {
      this.message = "You must enter all data"
      return;
    }
    if (this.size == null || this.size == undefined || this.size == "")
    {
      this.message = "You must enter all data"
      return;
    }
    if (this.numofrooms == null || this.numofrooms == undefined || this.numofrooms == "")
    {
      this.message = "You must enter all data"
      return;
    }
    if (this.furnished == null || this.furnished == undefined || this.furnished == "")
    {
      this.message = "You must enter all data"
      return;
    }
    if (this.price == null || this.price == undefined || this.price == "")
    {
      this.message = "You must enter all data"
      return;
    }

    let promoted = "0";
    let buyer = "";
    this.service.addNewListing(this.description, this.city, this.municipality, this.address, this.number, this.type, this.numoflevels, this.level, this.size, this.numofrooms, this.furnished, this.price, this.myUsername, promoted, buyer).subscribe(( ob ) =>
    {
      if(ob['listing'] == 'ok')
      {
        localStorage.setItem("listingadded", "You have successfully added new listing!");
        this.router.navigate(['/mylistings']);
      }
    });

    this.id = this.description;
    this.uploadPhoto(this.id);
  
  }

}
