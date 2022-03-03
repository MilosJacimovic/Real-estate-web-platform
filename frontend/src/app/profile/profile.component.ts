import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';
import { ServicesService } from '../services.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router : Router, private service : ServicesService) { }

  ngOnInit(): void {
    this.imageDataUrl = '../../assets/generic-profile.png';
    this.file_uploaded_message = "";
    this.message = "";
    this.myUsername = null;
    let isLogged = localStorage.getItem("LoggedUser");
    if(isLogged !== "logged") this.router.navigate(['/homepage']);
    else
    {
      this.myUsername = localStorage.getItem("myUsername");
      this.getMySelf();
    }
  }


  old_password;
  new_password;
  confirm_password;
  file_uploaded_message;
  error_file_uploaded_message;
  e;
  imageDataUrl;

  @ViewChild("name") name: ElementRef;
  @ViewChild("surname") surname: ElementRef;
  @ViewChild("username") username: ElementRef;
  @ViewChild("mail") mail: ElementRef;
  @ViewChild("city") city: ElementRef;
  @ViewChild("country") country: ElementRef;

  user;
  myUsername: string;
  message: string;
  errorMessage: string;
  profilePic;
  fileInput;
  imageError: string;
  cardImageBase64 : string;

  sendImageFile(fileInput: any)
  {
    this.fileInput = fileInput;
  }

  uploadPhoto()
  {
    if(!this.fileInput)
    {
      this.errorMessage = "You must enter all data 1"
    }
    else
    {
        if (this.fileInput.target.files && this.fileInput.target.files[0]) {
          // Size Filter Bytes
          const allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];


          if (!_.includes(allowed_types, this.fileInput.target.files[0].type)) {
              this.errorMessage = 'Only Images are allowed ( JPG | PNG | JPEG)';
              return;
          }
          const reader = new FileReader();
          reader.onload = (e: any) => {
              const image = new Image();
              image.src = e.target.result;
              image.onload = rs => {

                  const imgBase64Path = e.target.result;
                  this.cardImageBase64 = imgBase64Path;

                  this.service.changePhoto(this.myUsername, e.target.result).subscribe((ob) =>
                  {
                    if(ob['picture'] == 'ok')
                    {
                      this.message = "Succesfully updated picture!";
                      this.errorMessage = "";
                      this.getMySelf();
                    }
                    else
                    {
                      this.message = "";
                      this.errorMessage = "Failed to change picture";
                    }
                  })
                
                  // this.previewImagePath = imgBase64Path; 
              };
          };

          reader.readAsDataURL(this.fileInput.target.files[0]);
      }
      else
      {
        this.errorMessage = "You must enter all data 2"
      }
    }

  }

  getMySelf()
  {
    this.service.getOneUser(this.myUsername).subscribe((ob)=>
    {
      if(ob != null) 
      {
        this.user = ob;
        if(this.user.image == "")
        {
          this.profilePic = '../../assets/generic-profile.png';
        }
        else
        {
          this.profilePic = this.user.image;
        }
      }
    });
  }

  changePassword()
  {
    this.message = "";

    if (this.old_password == "" || this.old_password == undefined || this.new_password == "" || this.new_password == undefined || this.confirm_password == "" || this.confirm_password == undefined) 
    {
      this.errorMessage = "You must enter all data";
      return;
    }
    this.service.updatePassword(this.myUsername, this.old_password, this.new_password, this.confirm_password).subscribe((ob) =>
    {
      if(ob['user'] == 'ok')
      {
        this.message = "Succesfully updated password!";
        this.errorMessage = "";
      }
      else
      {
        if(ob['user'] == 'notOldPassword') this.errorMessage = "Old password is incorrect";
        if(ob['user'] == 'passwordsNotMatching') this.errorMessage = "New passwords dont match";
      }
    });
  }

  
  update() 
  {
      let name = this.name.nativeElement.value;
      let surname = this.surname.nativeElement.value;
      let username = this.myUsername
      let mail = this.mail.nativeElement.value;
      let city = this.city.nativeElement.value;
      let country = this.country.nativeElement.value;
      this.service.updateOneUser(name, surname, username, mail, city, country).subscribe((ob)=>
    {
      if(ob['user'] == "ok") this.message = "Succesfully updated information!";
      this.getMySelf();
    });
  }

}
