/*import { Component } from '@angular/core';

@Component({
  selector: 'app-recruiterprofile',
  imports: [],
  templateUrl: './recruiterprofile.component.html',
  styleUrl: './recruiterprofile.component.css'
})
export class RecruiterprofileComponent {

}
*/

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recruiterprofile',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './recruiterprofile.component.html',
  styleUrl: './recruiterprofile.component.css'
})
export class RecruiterprofileComponent {
  recruiter = {
    userId: 0,  // Initialize as null
    companyName: '',
    contactNumber: '',
    companyWebsite: ''
  };
  
  message: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUserId();
  }

  fetchUserId() {
    // const userApiUrl = 'http://localhost:5131/api/User'; // Replace with your actual API endpoint to fetch user info

    // this.http.get(userApiUrl).subscribe(
    //   (response: any) => {
    //     this.recruiter.userId = response.userId; // Adjust based on your API response structure
    //   },
    //   (error) => {
    //     console.error("Error fetching user ID:", error);
    //     this.message = "Failed to fetch user ID. Please try again.";
    //   }
    // );
    this.recruiter.userId = Number(localStorage.getItem("id"));
  }

  registerRecruiter() {
    if (this.isFormValid()) {
      this.isLoading = true;
      const apiUrl = 'http://localhost:5131/api/Recruiter/register';
  
      this.http.post(apiUrl, this.recruiter).subscribe(
        (response: any) => {
          this.message = "Recruiter registered successfully!";
          this.isLoading = false;
        },
        (error) => {
          console.error("Error:", error);
          if (error.status === 404) {
            this.message = "User not found. Please ensure the user ID is correct.";
          } else {
            this.message = `Failed to register recruiter. Error: ${error.message}`;
          }
          this.isLoading = false;
        }
      );
    } else {
      this.message = "Please fill in all required fields.";
    }
  }
  isFormValid(): boolean {
    return this.recruiter.userId !== null && this.recruiter.companyName !== '' && this.recruiter.contactNumber !== '' && this.recruiter.companyWebsite !== '';
  }
}