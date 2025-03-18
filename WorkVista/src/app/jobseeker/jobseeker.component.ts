import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobseeker',
  templateUrl: './jobseeker.component.html',
  styleUrl: './jobseeker.component.css'
})
export class JobseekerComponent {
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
