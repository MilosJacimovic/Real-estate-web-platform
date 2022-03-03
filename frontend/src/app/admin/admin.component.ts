import { Component, ElementRef,ViewChild, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: [
    './admin.component.css'
  ]
})

export class AdminComponent implements OnInit {

  constructor(private router : Router, private service : ServicesService) { }

  newName;
  newSurname;
  newType;
  wantToUpdate;
  unameForUpdate;

  typee = 1;

  ngOnInit(): void {
    this.newName = "";
    this.newSurname = "";
    this.newType = "";
    this.unameForUpdate = "";
    this.wantToUpdate = false;
    this.error_file_uploaded_message = "";
    this.myUsername = localStorage.getItem("myUsername");
    let isAdmin = localStorage.getItem("typeOfUser");
    if(isAdmin !== "admin") this.router.navigate(['/homepage']);
    else
    {
      this.getAllUsers();
    }

    this.service.file_uploaded_subject.subscribe(result=>{ 
      this.getAllUsers();
      if (result["status"] == "ok") {
        this.file_uploaded_message = "Successfuly uploaded file";
        this.getAllUsers();
      }
      else
        this.file_uploaded_message = "Error uploading file"
    })
  }

  myUsername;
  users;
  message;
  file_uploaded_message;
  error_file_uploaded_message
  e;




  getAllUsers()
  {
    this.service.getAllUsers().subscribe((ob)=>
    {
      if(ob != null)
      {
        this.users = ob;
      }
    });
  }

  file_change(e)
  {
    this.e = e;
    this.getAllUsers();
  }

  approve(username)
  {
    this.service.approveUser(username).subscribe((ob)=>
    {
      if(ob['user'] == "ok") alert('User approved succesfully!');
      this.getAllUsers();

    });
  } 

  show_type(outer_type: Number) {
    this.typee = outer_type.valueOf();
  }

  decline(username) 
  {
    this.service.declineUser(username).subscribe((ob)=>
    {
      if(ob['user'] == "ok") alert('User declined succesfully!');
      this.getAllUsers();
    });
  }

  delete(username) 
  {
    this.service.deleteUser(username).subscribe((ob)=>
    {
      if(ob['user'] == "ok") alert('User deleted succesfully!');
      this.getAllUsers();
    });
  }

  uploadJson()
  {
    if(this.e != null)
    {
      this.file_change(this.e);
      this.service.send_file(this.e);
      this.file_uploaded_message = "Successfuly uploaded file";
      this.getAllUsers();
    }
    else this.error_file_uploaded_message = "Please add files to upload!";
  }

  update(uUsername, uMail) 
  {
      this.unameForUpdate = uUsername;
      this.wantToUpdate = true;
  }

  addUser()
  {
    this.router.navigate(['/addoneuser'])
  }
  updateUser(uName, uSurname, uUsername, uMail, uType)
  {

    if(this.newName == "" || this.newName == undefined) this.newName = uName;
    if(this.newSurname == "" || this.newSurname == undefined) this.newSurname = uSurname;
    if(this.newType == "" || this.newType == undefined) this.newType = uType;
    //alert(this.newName + " " + this.newSurname + " " + uUsername + " " + uMail + " " + this.newType);

    this.service.updateUser(this.newName, this.newSurname, uUsername, uMail, this.newType).subscribe((ob)=>
    {
      if(ob['user'] == "ok") 
      {
        alert('User updated succesfully!');
        this.newName = "";
        this.newSurname = "";
        this.newType = "";
        this.wantToUpdate = false;
      }
      this.getAllUsers();
    });
  }
}
