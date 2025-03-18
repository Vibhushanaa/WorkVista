/*import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Form submitted');
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);

  }

}*/

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData = { email: this.email, password: this.password };
    this.http.post<{ token: string; role: string }>('http://localhost:5131/api/User/login', loginData)
      .subscribe(response => {
        console.log('Login Successful:', response);

        if(response.token){
          localStorage.setItem('token',response.token);
          const tokenDecode: any = jwtDecode(response.token);
         
          const userid = tokenDecode.id;
          const email = tokenDecode.email;
          const role = tokenDecode.role;
          localStorage.setItem('id',userid);
          localStorage.setItem('email',email);
          localStorage.setItem('role',role);
          console.log("Role Stored:", response.role);//temp
        }
        else{
          console.error("role not found");//temp
        }
        
        let role = localStorage.getItem('role');
        // Redirect based on role
        if (role == 'Recruiter') {
          this.router.navigate(['/recruiter']);
        } else if (role === 'Job Seeker') {
          this.router.navigate(['/jobseeker']);
        } else {
          alert('Invalid role received from server');
        }
      }, error => {
        console.error('Login failed:', error);
        alert('Invalid email or password');
      });
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}