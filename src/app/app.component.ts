import { Component, OnInit,AfterViewInit, HostListener } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'taxInvoice';
  // showHeaderAndFooter = false;
  showHeaderAndFooter = true;
  scrollProgress = 0;
  constructor(private router: Router) { }

ngOnInit() {
  // Subscribe to router events
  this.router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      this.checkUrl(event.url);
    }
    if (event instanceof NavigationEnd) {
      console.log('Current URL:', event.url, 'Show Header and Footer:', this.showHeaderAndFooter); // Debug statement
    }
  });
  this.updateScrollProgress();

}

ngAfterViewInit() {
  // Check URL after the view has initialized
  this.checkUrl(this.router.url);
}

checkUrl(url: string) {
  this.showHeaderAndFooter = !url.includes('/user-invoice') &&
                             !url.includes('/not-found') &&
                             !url.includes('/tax-form') &&
                             !url.includes('/netcore-index.html')&&
                             !url.includes('/tax-history')&&
                             !url.includes('/user-requirement');

}
// HostListener to capture scrolling
updateScrollProgress() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  
  // Calculate the scroll percentage
  this.scrollProgress = (scrollTop / docHeight) * 100;
}

@HostListener('window:scroll', [])
onWindowScroll() {
  this.updateScrollProgress();
}
}