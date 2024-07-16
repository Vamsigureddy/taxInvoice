import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-html-articles',
  templateUrl: './html-articles.component.html',
  styleUrls: ['./html-articles.component.css']
})
export class HtmlArticlesComponent {

  constructor(private activateRoute: ActivatedRoute, private router: Router) {

  }

  windowID = '';
  openNewWindow(ID: string) {
    this.windowID = ID;

    this.router.navigate(["/html-articles/1"]);

  }


}
