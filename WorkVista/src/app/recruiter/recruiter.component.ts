import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruiter',
  imports: [CommonModule, FormsModule],
  templateUrl: './recruiter.component.html',
  styleUrl: './recruiter.component.css'
})
export class RecruiterComponent {

  constructor(private router: Router) {}
  
  logout() {
    // Implement your logout logic here
    // Clear local storage or any other logout logic
    this.router.navigate(['/login']); // Redirect to login page
  }

  navigateTo( route : string ){
    this.router.navigate([route]);
  }
}


