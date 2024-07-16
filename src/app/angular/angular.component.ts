import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';


@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.css']
})
export class AngularComponent implements OnInit {
  callbackForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private  router:Router, private callbackRequestService:InvoiceService) {
    this.callbackForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      requirement: ['', [Validators.required, Validators.minLength(10)]],
      location: ['', Validators.required]
    });
    
  }

  ngOnInit(): void {
   
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.callbackForm.valid) {
      const formData = {
        full_name: this.callbackForm.get('fullName')?.value,
        email: this.callbackForm.get('email')?.value,
        phone: this.callbackForm.get('phone')?.value,
        requirement: this.callbackForm.get('requirement')?.value,
        location: this.callbackForm.get('location')?.value
      };

      this.callbackRequestService.createCallbackRequest(formData).subscribe(
        response => {
          console.log('Callback request created successfully', response);
          this.submitted = true;

          // Reset form or show success message
        },
        error => {
          console.error('Error creating callback request', error);
          // Handle error, show error message
        }
      );
    }
  }
  homepage(){
    this.submitted = true;
    this.router.navigate([""])

  }
}
 