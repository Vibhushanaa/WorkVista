/*import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [ FormsModule ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  fullName: string = '';
  email: string = '';
  role: string = '';
  password: string = '';
  
  constructor(private router: Router){}
  onSubmit() {
    // Implement your sign-up logic here
    console.log('Full Name:', this.fullName);
    console.log('Email:', this.email);
    console.log('Role:', this.role);
    console.log('Password:', this.password);
    this.router.navigate(['/home']);
  }

  navigateToLogin(){
    this.router.navigate(['/login']);
  }

}*/


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [FormsModule]
})
export class SignupComponent {
  fullName: string = '';
  email: string = '';
  role: string = '';
  password: string = '';

  private baseUrl = 'http://localhost:5131/api/User'; // Your backend API

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const userData = {
      fullName: this.fullName,
      email: this.email,
      role: this.role,
      password: this.password
    };

    this.http.post(`${this.baseUrl}/signup`, userData, { responseType: 'text' }).subscribe(
      response => {
        console.log('Registration Successful:', response);
        this.router.navigate(['/login']); // Navigate to login page after successful registration
      },
      error => {
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again.');
      }
    );
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
