import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // <-- Import CommonModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotfoundComponent } from './notfound/notfound.component';
import { HtmlComponent } from './html/html.component';
import { FooterComponent } from './footer/footer.component';
import { HomealertComponent } from './homealert/homealert.component';
import { AngularComponent } from './angular/angular.component';


@NgModule({
  declarations: [
    NotfoundComponent,
    HtmlComponent,
    HomealertComponent,
    AngularComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,  // <-- Add CommonModule here
    ReactiveFormsModule,  // <-- Add ReactiveFormsModule here
    FormsModule,// Add FormsModule to the imports array


  ],
  providers: [],
  bootstrap:[AppComponent]
  
})
export class AppModule { }
