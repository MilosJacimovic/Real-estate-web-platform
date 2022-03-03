import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAddUserComponent } from './admin-add-user/admin-add-user.component';
import { AdminComponent } from './admin/admin.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ChartsComponent } from './charts/charts.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ImguploadComponent } from './imgupload/imgupload.component';
import { LandingComponent } from './landing/landing.component';
import { ListingComponent } from './listing/listing.component';
import { LoginComponent } from './login/login.component';
import { ManipulateComponent } from './manipulate/manipulate.component';
import { MylistingsComponent } from './mylistings/mylistings.component';
import { NewlistingComponent } from './newlisting/newlisting.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', component : LandingComponent},
  {path: 'landing', component : LandingComponent},
  {path: 'login', component : LoginComponent},
  {path: 'homepage', component : HomepageComponent},
  {path: 'register', component : RegisterComponent},
  {path : 'header', component: HeaderComponent},
  {path : 'profile', component : ProfileComponent},
  {path : 'admin', component : AdminComponent},
  {path : 'newlisting', component : NewlistingComponent},
  {path : 'mylistings', component : MylistingsComponent},
  {path : 'manipulate', component : ManipulateComponent},
  {path : 'imgupload', component : ImguploadComponent},
  {path : 'charts', component : ChartsComponent},
  {path : 'listing', component : ListingComponent},
  {path : 'carousel', component : CarouselComponent},
  {path : 'addoneuser', component :AdminAddUserComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
