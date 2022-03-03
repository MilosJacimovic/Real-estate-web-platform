import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './Model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  
  constructor(private http : HttpClient) { }

  url = 'http://localhost:4000';
  private host = 'http://localhost:4000';
  logged_in_user = new Subject;

  login(username, password)
  {
    const data =
    {
      username : username,
      password : password
    };

    return this.http.post(`${this.url}/login`, data);
  }

  register(name, surname, mail, username, password, confpassword, city, country, type, stat)
  {
    const data =
    {
      name : name,
      surname : surname,
      username : username,
      password : password,
      mail : mail,
      confpassword : confpassword,
      city : city,
      country : country,
      type : type,
      stat : stat,
      image : ""
    }

    return this.http.post(`${this.url}/register`, data);

  }

  getAllUsers()
  {
    return this.http.get(`${this.url}/getAllUsers`);
  }

  approveUser(username)
  {
    const data =
    {
      username : username
    }
    return this.http.post(`${this.url}/approveUser`, data);
  }

  declineUser(username)
  {
    const data =
    {
      username : username
    }
    return this.http.post(`${this.url}/declineUser`, data);
  }

  deleteUser(username)
  {
    const data =
    {
      username : username
    }
    return this.http.post(`${this.url}/declineUser`, data);
  }

  updateOneUser(name, surname, username, mail, city, country)
  {
    const data =
    {
      name : name,
      surname : surname,
      username : username,
      mail : mail,
      city : city,
      country : country
    }

    return this.http.post(`${this.url}/updateOneUser`, data);
  }

  getOneUser(username)
  {
    const data =
    {
      username : username
    }
    return this.http.post(`${this.url}/getOneUser`, data);
  }

  updatePassword(username, oldpassword, newpassword, confpassword)
  {
    const data =
    {
      username : username,
      oldpassword : oldpassword,
      newpassword : newpassword,
      confpassword : confpassword
    }
    return this.http.post(`${this.url}/updatePassword`, data);
  }

  changePhoto(username, img)
  {
    const data =
    {
      username : username,
      img : img
    }

    return this.http.post(`${this.url}/changePhoto`, data);
  }

  updateUser(name, surname, username, mail, type)
  {
    const data =
    {
      name : name,
      surname : surname,
      username : username,
      mail : mail,
      type : type
    }
    return this.http.post(`${this.url}/updateUser`, data);
  }

  file_uploaded_message: String;
  file_uploaded_subject = new Subject<String>();

  send_file(event) {
      let fileList: FileList = event.target["files"];
      if(fileList.length > 0) {
          let file: File = fileList[0];
          let formData:FormData = new FormData();
          formData.append('uploadFile', file, file.name);
          let headers = new Headers();
          headers.append('Content-Type', 'multipart/form-data');
          headers.append('Accept', 'application/json');
          this.http.post(this.host + '/api/v1/product/upload_products_file', formData).subscribe(
              data => {
                  this.file_uploaded_message = <String>data;
              },
              error => console.log(error) 
          )
      }
  }

  send_photos(event, uname) {
    let fileList: FileList = event.target["files"];
    if(fileList.length > 0) {
      let formData = new FormData();
      formData.append('username', uname);
      let nm = fileList.length;
      for(let i  = 0; i < nm; i++)
      {
        let file: File = fileList[i];
        formData.append('avatar', file);
      }

      let params = new HttpParams();
  
      const options = {
        params: params,
        reportProgress: true,
      };
  
      const req = new HttpRequest('POST', `${this.url}/photo`, formData, options);
      return this.http.request(req);
    }
}

  getMyListings(username)
  {
    const data =
    {
      username : username
    }

    return this.http.post(`${this.url}/getMyListings`, data);
  }

  
  getMyPurchases(username)
  {
    const data =
    {
      username : username
    }

    return this.http.post(`${this.url}/getMyPurchases`, data);
  }

  buyListing(id, username)
  {
    const data =
    {
      id : id,
      username : username
    }

    return this.http.post(`${this.url}/buyListing`, data);
  }

  getListing(id)
  {
    const data =
    {
      id : id
    }

    return this.http.post(`${this.url}/getListing`, data);
  }

  addNewListing(description, city, municipality, address, number, type, numoflevels, level, size, numofrooms, furnished, price, myUsername, promoted, buyer)
  {
    const data =
    {
      description : description,
      city : city,
      municipality : municipality,
      address : address,
      number : number,
      type : type,
      numoflevels : numoflevels,
      level : level,
      size : size,
      numofrooms : numofrooms,
      furnished : furnished,
      price : price,
      username : myUsername,
      status : "0",
      promoted : promoted,
      buyer : buyer
    }

    return this.http.post(`${this.url}/addNewListing`, data);
  }


  getAllListings()
  {
    return this.http.get(`${this.url}/getAllListings`);
  }

  getNumOfHouses()
  {
    return this.http.get(`${this.url}/getNumOfHouses`);
  }

  getNumOfApartments()
  {
    return this.http.get(`${this.url}/getNumOfApartments`);
  }

  getPromotedListings()
  {
    return this.http.get(`${this.url}/getPromotedListings`);
  }

  searchByCity(city)
  {
    const data =
    {
      city : city
    }

    return this.http.post(`${this.url}/searchByCity`, data);
  }

  wantToBuy(usr, id)
  {
    const data =
    {
      user : usr,
      id: id
    }

    return this.http.post(`${this.url}/wantToBuy`, data);
  }
  searchByPrice(price)
  {
    const data =
    {
      price : price
    }

    return this.http.post(`${this.url}/searchByPrice`, data);
  }

  
  getPotentialBuyers(id)
  {
    const data =
    {
      id : id
    }

    return this.http.post(`${this.url}/getPotentialBuyers`, data);
  }
  searchByCityandPrice(city, price)
  {
    const data =
    {
      city : city,
      price : price
    }

    return this.http.post(`${this.url}/searchByCityandPrice`, data);
  }
  approveListing(id)
  {
    const data =
    {
      id : id
    }
    return this.http.post(`${this.url}/approveListing`, data);
  }

  declineListing(id)
  {
    const data =
    {
      id : id
    }

    return this.http.post(`${this.url}/declineListing`, data);
  }

  promoteListing(id)
  {
    const data =
    {
      id : id
    }

    return this.http.post(`${this.url}/promoteListing`, data);
  }

  upPromote(id)
  {
    const data =
    {
      id : id
    }

    return this.http.post(`${this.url}/upPromoteListing`, data);
  }

  deleteListing(id)
  {
    const data =
    {
      id : id
    }

    return this.http.post(`${this.url}/deleteListing`, data);
  }
  
}
