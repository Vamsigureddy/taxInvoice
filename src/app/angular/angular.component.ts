import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.css']
})
export class AngularComponent implements OnInit {
  callbackForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private  router:Router) {
    
  }

  ngOnInit(): void {
    this.callbackForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      requirement: ['', [Validators.required, Validators.minLength(10)]],
      location: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.callbackForm.valid) {
      console.log('Form Submitted!', this.callbackForm.value);
      this.submitted = true;

    } else {
      console.log('Form not valid');
    }
  }
  homepage(){
    this.submitted = true;
    this.router.navigate([""])

  }
}
 