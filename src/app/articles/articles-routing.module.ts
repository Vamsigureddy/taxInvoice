import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AngularComponent } from '../angular/angular.component';
import { TypescriptComponent } from '../typescript/typescript.component';
import { AspnetcoreComponent } from '../aspnetcore/aspnetcore.component';
import { ArticlesComponent } from './articles.component';
import { AngularArticlesComponent } from './angular-articles/angular-articles.component';
import { JavascriptArticlesComponent } from './javascript-articles/javascript-articles.component';
import { TypescriptArticlesComponent } from './typescript-articles/typescript-articles.component';
import { NetcoreArticlesComponent } from './netcore-articles/netcore-articles.component';
import { HtmlArticlesComponent } from './html-articles/html-articles.component';
import { HtmlArticlesNewwindowComponent } from './html-articles/html-articles-newwindow/html-articles-newwindow.component';

const appChildRoutes: Routes = [
  { path: '', component: ArticlesComponent },
  { path: 'javascript-articles', component: JavascriptArticlesComponent },
  { path: 'typescript-articles', component: TypescriptArticlesComponent },
  { path: 'aspnetcore-articles', component: NetcoreArticlesComponent },
  {
    path: 'html-articles',
    component: HtmlArticlesComponent,
    children: [
      { path: ':/ID', component: HtmlArticlesNewwindowComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appChildRoutes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
