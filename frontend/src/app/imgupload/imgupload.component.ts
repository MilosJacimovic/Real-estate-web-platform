import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-imgupload',
  templateUrl: './imgupload.component.html',
  styleUrls: ['./imgupload.component.css']
})


export class ImguploadComponent implements OnInit {

  imageError: string;
  cardImageBase64;
  imgb64;
  

  constructor() { }

  ngOnInit() {
  }

  fileChangeEvent(fileInput: any) {
      this.imageError = null;
      if (fileInput.target.files && fileInput.target.files[0]) {
          // Size Filter Bytes
          const allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];


          if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
              this.imageError = 'Only Images are allowed ( JPG | PNG | JPEG)';
              return false;
          }
          const reader = new FileReader();
          reader.onload = (e: any) => {
              const image = new Image();
              image.src = e.target.result;
              alert("imgsrc " + image.src);
              image.onload = rs => {
                  

                  const imgBase64Path = e.target.result;
                  this.imgb64 = e.target.resul;
                  alert("imgb64 " + this.imgb64);
                  this.cardImageBase64 = imgBase64Path;
                  // this.previewImagePath = imgBase64Path; 
              };
          };

          reader.readAsDataURL(fileInput.target.files[0]);
      }
      //alert(this.cardImageBase64);
      alert("out of  " + this.imgb64);
  }

  
}
