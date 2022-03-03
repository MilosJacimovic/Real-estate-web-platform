import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { NewlistingComponent } from './newlisting/newlisting.component';
import { MylistingsComponent } from './mylistings/mylistings.component';
import { ManipulateComponent } from './manipulate/manipulate.component';
import { ImguploadComponent } from './imgupload/imgupload.component';
import { ChartsComponent } from './charts/charts.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ListingComponent } from './listing/listing.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AdminAddUserComponent } from './admin-add-user/admin-add-user.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    AdminComponent,
    NewlistingComponent,
    MylistingsComponent,
    ManipulateComponent,
    ImguploadComponent,
    ChartsComponent,
    CarouselComponent,
    ListingComponent,
    AdminAddUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
