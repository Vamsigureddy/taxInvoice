import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  constructor(private router: Router) {}

  userDetails(){
    this.router.navigate(['/angular-training']);
    }
    @ViewChild('contactButton') contactButton: ElementRef;

  onMouseEnter() {
    this.contactButton.nativeElement.classList.remove('btn-danger');
    this.contactButton.nativeElement.classList.add('btn-success');
  }

  onMouseLeave() {
    this.contactButton.nativeElement.classList.remove('btn-success');
    this.contactButton.nativeElement.classList.add('btn-primary');
  }
}
