import { NgModule } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { AngularComponent } from './angular/angular.component';
import { TypescriptComponent } from './typescript/typescript.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import { HtmlComponent } from './html/html.component';
import { FooterComponent } from './footer/footer.component';
import { HomealertComponent } from './homealert/homealert.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user-requirement', component: AngularComponent },
  { path: 'user-invoice', component: HtmlComponent },
  { path: 'user-invoice/:id', component: HtmlComponent },
  { path: 'not-found', component: NotfoundComponent },
  { path: 'tax-form', component: HomealertComponent },
  { path: 'tax-history', component:TypescriptComponent},


  // {
  //   path: 'articles',
  //   loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule)
  // },

  { path: "**", redirectTo: "not-found" }
];

@NgModule({
  declarations: [
    AppComponent,
    TypescriptComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[ RouterModule]
})
export class AppRoutingModule { }
