import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface User {
  email: string;
  password: string;
}
@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent {
  email: string = '';
  password: string = '';
  alertMessage: string | null = null;


  constructor(private router: Router, private authService: AuthService) {} // Inject AuthService

 
  onSubmit() {
   this.authService.login(this.email, this.password).subscribe(
      response => {
        this.alertMessage = 'Login successful!';
        this.router.navigate(['/tax-form']);
        console.log('Login successful!', response);

        // Handle successful login here, e.g., save token, navigate to another page, etc.
      },
      error => {
        this.alertMessage = 'Login failed. Please try again.';
        console.error('Login failed', error);
        // Handle login error here
      }
    );
  }
}