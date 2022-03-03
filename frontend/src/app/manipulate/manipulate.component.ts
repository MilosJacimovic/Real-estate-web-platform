import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-manipulate',
  templateUrl: './manipulate.component.html',
  styleUrls: ['./manipulate.component.css']
})
export class ManipulateComponent implements OnInit {

  constructor(private router : Router, private service : ServicesService) { }

  ngOnInit(): void {
    this.myUsername = localStorage.getItem("myUsername");
    let isAdmin = localStorage.getItem("typeOfUser");
    if(isAdmin != "admin" && isAdmin != "agent") this.router.navigate(['/homepage']);
    else
    {
      this.getAllListings();
    }
  }

  listings;

  myUsername;

  getAllListings()
  {
    this.service.getAllListings().subscribe((ob)=>
    {
      if(ob != null)
      {
        this.listings = ob;
      }
    });
  }

  approve(id)
  {
    this.service.approveListing(id).subscribe((ob)=>
    {
      if(ob['listing'] == "ok") alert('Listing approved succesfully!');
      this.getAllListings();

    });
  }

  delcine(id)
  {
    this.service.declineListing(id).subscribe((ob)=>
    {
      if(ob['listing'] == "ok") alert('Listing declined succesfully!');
      this.getAllListings();

    });
  }

  delete(id)
  {
    this.service.deleteListing(id).subscribe((ob)=>
    {
      if(ob['listing'] == "ok") alert('Listing declined succesfully!');
      this.getAllListings();

    });
  }

  promote(id)
  {
    this.service.promoteListing(id).subscribe((ob)=>
    {
      if(ob['listing'] == "ok") alert('Listing promoted succesfully!');
      this.getAllListings();

    });
  }

  upPromote(id)
  {
    this.service.upPromote(id).subscribe((ob)=>
    {
      if(ob['listing'] == "ok") alert('Listing promoted succesfully!');
      this.getAllListings();

    });
  }
   
}
