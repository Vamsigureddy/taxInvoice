import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { HtmlArticlesComponent } from './html-articles/html-articles.component';
//import { HtmlArticlesNewwindosComponent } from './html-articles/html-articles-newwindos/html-articles-newwindos.component';
import { HtmlArticlesNewwindowComponent } from './html-articles/html-articles-newwindow/html-articles-newwindow.component';
import { FormsModule } from '@angular/forms';  // <-- Import FormsModule
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HtmlArticlesComponent,
    HtmlArticlesNewwindowComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    FormsModule,
    ReactiveFormsModule  // <-- Add FormsModule here

  ]
})


export class ArticlesModule {


 }
