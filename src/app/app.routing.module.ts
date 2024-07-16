import { NgModule } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { AngularComponent } from './angular/angular.component';
import { TypescriptComponent } from './typescript/typescript.component';
import { AspnetcoreComponent } from './aspnetcore/aspnetcore.component';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RouterModule, Routes } from '@angular/router';
import { TypescriptArticlesComponent } from './articles/typescript-articles/typescript-articles.component';
import { JavascriptArticlesComponent } from './articles/javascript-articles/javascript-articles.component';
import { AngularArticlesComponent } from './articles/angular-articles/angular-articles.component';
import { TemplatesComponent } from './bootstrap/templates/templates.component';
import { CarouselComponent } from './carousel/carousel.component';
import { HeaderComponent } from './header/header.component';
import { CourseupdatesComponent } from './courseupdates/courseupdates.component';
import { ArticlesComponent } from './articles/articles.component';
import { AppComponent } from './app.component';
import { HtmlComponent } from './html/html.component';
import { FooterComponent } from './footer/footer.component';
import { HomealertComponent } from './homealert/homealert.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'angular-training', component: AngularComponent },
  { path: 'typescript-training', component: TypescriptComponent },
  { path: 'aspnetcore-training', component: AspnetcoreComponent },
  { path: 'bootstrap-training', component: BootstrapComponent },
  { path: 'html-training', component: HtmlComponent },
  { path: 'html-training/:id', component: HtmlComponent },
  { path: 'not-found', component: NotfoundComponent },
  { path: 'tax-form', component: HomealertComponent },
  { path: 'tax-history', component:TypescriptComponent},


  {
    path: 'articles',
    loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule)
  },

  { path: "**", redirectTo: "not-found" }
];

@NgModule({
  declarations: [
    AppComponent,
    TypescriptComponent,
    BootstrapComponent,
    AspnetcoreComponent,
    ArticlesComponent,
    CourseupdatesComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    HomeComponent,
    TemplatesComponent,
    TemplatesComponent,
    AngularArticlesComponent,
    JavascriptArticlesComponent,
    TypescriptArticlesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[ RouterModule]
})
export class AppRoutingModule { }
