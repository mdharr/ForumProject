import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {

  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: [''],
      email: [''],
      role: [''],
      firstName: [''],
      lastName: [''],
      createdAt: [''],
      lastActivity: [''],
      postCount: [''],
      commentCount: [''],
      // Add other form controls for additional properties
    });
  }

  onSubmit() {
    // Handle form submission logic here
  }

}
