import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  displayWindows: boolean = true; // Display Windows section by default
  displayDoors: boolean = false;
  constructor(private router: Router) {}

  showWindows() {
    this.displayWindows = true;
    this.displayDoors = false;
  }

  showDoors() {
    this.displayWindows = false;
    this.displayDoors = true;
  }
  ngOnInit(): void {
    this.checkVisibility();
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkVisibility();
  }

  private checkVisibility(): void {
    const sections = document.querySelectorAll('.section-heading h5, .section-heading p');
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        section.classList.add('in-view');
      } else {
        section.classList.remove('in-view');
      }
    });
  }
  userDetails(){
    this.router.navigate(['/user-requirement']);
    }
}