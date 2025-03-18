/*import { Component } from '@angular/core';

@Component({
  selector: 'app-trackapplication',
  imports: [],
  templateUrl: './trackapplication.component.html',
  styleUrl: './trackapplication.component.css'
})
export class TrackapplicationComponent {

}*/

/*import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Application {
  applicationId: number;
  jobSeekerId: number;
  jobId: number;
  appliedDate: string;
  status: string;
  jobPost: {
    title: string;
    description: string;
    location: string;
    salary: number;
    experience: string;
    jobType: string;
    jobCategory: string;
    postedDate: string;
  };
}

@Component({
  selector: 'app-trackapplication',
  imports: [ CommonModule ],
  templateUrl: './trackapplication.component.html',
  styleUrls: ['./trackapplication.component.css']
})
export class TrackapplicationComponent implements OnInit {
  applications: Application[] = [];
  userId: string | null = null;
  jobSeekerId: string | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';
  applicationStatus: any = null;

  private apiUrl = 'http://localhost:5131/api/Application';
  private jobSeekerApiUrl = 'http://localhost:5131/api/JobSeeker';

  constructor(private http: HttpClient) {}

  getHeaders() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }) };
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    if (this.userId !== null) {
      this.fetchJobSeekerId();
    } else {
      this.isLoading = false;
      this.errorMessage = "User ID not found. Please log in again.";
      console.error(this.errorMessage);
    }
  }

  fetchJobSeekerId(): void {
    if (this.userId === null) {
      this.errorMessage = "User ID is missing. Cannot fetch jobseeker ID.";
      this.isLoading = false;
      console.error(this.errorMessage);
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.http.get<any>(`${this.jobSeekerApiUrl}/${this.userId}`, { headers }).subscribe({
      next: (response) => {
        console.log(response.jobSeekerId);
        console.log(response);
        this.jobSeekerId = response.jobSeekerId; // Adjust based on actual response structure
        if (this.jobSeekerId !== null) {
          this.fetchApplications();
          console.log(this.jobSeekerId);
        } else {
          this.isLoading = false;
          this.errorMessage = "Jobseeker ID not found. Please log in again.";
          console.error(this.errorMessage);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "Error fetching jobseeker ID. Please try again later.";
        console.error("Error fetching jobseeker ID:", error);
      }
    });
  }

  fetchApplications(): void {
    if (this.jobSeekerId === null) {
      this.errorMessage = "Jobseeker ID is missing. Cannot fetch applications.";
      this.isLoading = false;
      console.error(this.errorMessage);
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.http.get<Application[]>(`${this.apiUrl}/view/${this.jobSeekerId}`, { headers }).subscribe({
      next: (applications) => {
        console.log(applications);
        console.log("API Response:", applications);
        this.applications = applications.map(app => ({
          applicationId: app.applicationId,
          jobSeekerId: app.jobSeekerId,
          jobId: app.jobId,
          appliedDate: app.appliedDate,
          status: app.status,
          jobPost: {
            title: app.jobPost.title,
            description: app.jobPost.description,
            location: app.jobPost.location,
            salary: app.jobPost.salary,
            experience: app.jobPost.experience,
            jobType: app.jobPost.jobType,
            jobCategory: app.jobPost.jobCategory,
            postedDate: app.jobPost.postedDate
          }
        }));
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "Error fetching applications. Please try again later.";
        console.error("Error fetching applications:", error);
      }
    });
  }*/

  /*withdrawApplication(applicationId: number): void {
    if (!confirm('Are you sure you want to withdraw this application?')) {
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.http.delete(`${this.apiUrl}/withdraw/${applicationId}`, { headers }).subscribe({
      next: () => {
        alert('Application withdrawn successfully!');
        this.applications = this.applications.filter(app => app.applicationId !== applicationId);
      },
      error: (error) => {
        console.error('Error withdrawing application:', error);
        alert(error.error || 'Failed to withdraw application.');
      }
    });
  }*/

 /*   withdrawApplication(applicationId: number): void {
      if (!confirm('Are you sure you want to withdraw this application?')) {
        return;
      }
      const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
      console.log(`Sending DELETE request to ${this.apiUrl}/withdraw/${applicationId} with headers:`, headers);
      this.http.delete(`${this.apiUrl}/withdraw/${applicationId}`, { headers }).subscribe({
        next: () => {
          alert('Application withdrawn successfully!');
          this.applications = this.applications.filter(app => app.applicationId !== applicationId);
        },
        error: (error) => {
          console.error('Error withdrawing application:', error);
          if (error instanceof HttpErrorResponse) {
            if (error.status === 400) {
              alert('Bad Request: The server could not understand the request. Please check the application ID and try again.');
            } else {
              alert(`Failed to withdraw application. Error: ${error.message}`);
            }
          } else {
            alert('An unexpected error occurred. Please try again later.');
          }
        }
      });
    }

  trackApplicationStatus(applicationId: number): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.http.get<any>(`${this.apiUrl}/status/${applicationId}`, { headers }).subscribe({
      next: (response) => {
        this.applicationStatus = response;
        console.log('Application status:', response);
      },
      error: (error) => {
        console.error('Error tracking application status:', error);
        this.errorMessage = `Failed to track application status. Error: ${error.message}`;
      }
    });
  }
}*/


/*import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Application {
  applicationId: number;
  jobSeekerId: number;
  jobId: number;
  appliedDate: string;
  status: string;
  jobPost: {
    title: string;
    description: string;
    location: string;
    salary: number;
    experience: string;
    jobType: string;
    jobCategory: string;
    postedDate: string;
  };
}

@Component({
  selector: 'app-trackapplication',
  imports: [ CommonModule ],
  templateUrl: './trackapplication.component.html',
  styleUrls: ['./trackapplication.component.css']
})
export class TrackapplicationComponent implements OnInit {
  applications: Application[] = [];
  userId: string | null = null;
  jobSeekerId: string | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';
  applicationStatus: any = null;

  private apiUrl = 'http://localhost:5131/api/Application';
  private jobSeekerApiUrl = 'http://localhost:5131/api/JobSeeker';

  constructor(private http: HttpClient) {}

  getHeaders() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }) };
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    if (this.userId !== null) {
      this.fetchJobSeekerId();
    } else {
      this.isLoading = false;
      this.errorMessage = "User ID not found. Please log in again.";
      console.error(this.errorMessage);
    }
  }

  fetchJobSeekerId(): void {
    if (this.userId === null) {
      this.errorMessage = "User ID is missing. Cannot fetch jobseeker ID.";
      this.isLoading = false;
      console.error(this.errorMessage);
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.http.get<any>(`${this.jobSeekerApiUrl}/${this.userId}`, { headers }).subscribe({
      next: (response) => {
        console.log(response.jobSeekerId);
        console.log(response);
        this.jobSeekerId = response.jobSeekerId; // Adjust based on actual response structure
        if (this.jobSeekerId !== null) {
          this.fetchApplications();
          console.log(this.jobSeekerId);
        } else {
          this.isLoading = false;
          this.errorMessage = "Jobseeker ID not found. Please log in again.";
          console.error(this.errorMessage);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "Error fetching jobseeker ID. Please try again later.";
        console.error("Error fetching jobseeker ID:", error);
      }
    });
  }

  fetchApplications(): void {
    if (this.jobSeekerId === null) {
      this.errorMessage = "Jobseeker ID is missing. Cannot fetch applications.";
      this.isLoading = false;
      console.error(this.errorMessage);
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.http.get<Application[]>(`${this.apiUrl}/view/${this.jobSeekerId}`, { headers }).subscribe({
      next: (applications) => {
        console.log(applications);
        console.log("API Response:", applications);
        this.applications = applications.map(app => ({
          applicationId: app.applicationId,
          jobSeekerId: app.jobSeekerId,
          jobId: app.jobId,
          appliedDate: app.appliedDate,
          status: app.status,
          jobPost: {
            title: app.jobPost.title,
            description: app.jobPost.description,
            location: app.jobPost.location,
            salary: app.jobPost.salary,
            experience: app.jobPost.experience,
            jobType: app.jobPost.jobType,
            jobCategory: app.jobPost.jobCategory,
            postedDate: app.jobPost.postedDate
          }
        }));
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "Error fetching applications. Please try again later.";
        console.error("Error fetching applications:", error);
      }
    });
  }

  withdrawApplication(): void {
    const applicationId = localStorage.getItem('applicationId');
    if (!applicationId) {
      alert('Application ID not found in local storage.');
      return;
    }
  
    if (!confirm('Are you sure you want to withdraw this application?')) {
      return;
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    console.log(`Sending DELETE request to ${this.apiUrl}/withdraw/${applicationId} with headers:`, headers);
    this.http.delete(`${this.apiUrl}/withdraw/${applicationId}`, { headers }).subscribe({
      next: () => {
        alert('Application withdrawn successfully!');
        this.applications = this.applications.filter(app => app.applicationId !== Number(applicationId));
      },
      error: (error) => {
        console.error('Error withdrawing application:', error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 400) {
            alert('Bad Request: The server could not understand the request. Please check the application ID and try again.');
          } else {
            alert(`Failed to withdraw application. Error: ${error.message}`);
          }
        } else {
          alert('An unexpected error occurred. Please try again later.');
        }
      }
    });

  }

  trackApplicationStatus(applicationId: number): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.http.get<any>(`${this.apiUrl}/status/${applicationId}`, { headers }).subscribe({
      next: (response) => {
        this.applicationStatus = response;
        console.log('Application status:', response);
      },
      error: (error) => {
        console.error('Error tracking application status:', error);
        this.errorMessage = `Failed to track application status. Error: ${error.message}`;
      }
    });
  }
}*/
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Application {
  applicationId: number;
  jobSeekerId: number;
  jobId: number;
  appliedDate: string;
  status: string;
  jobPost: {
    title: string;
    description: string;
    location: string;
    salary: number;
    experience: string;
    jobType: string;
    jobCategory: string;
    postedDate: string;
    applicationId: number;
  };
}

@Component({
  selector: 'app-trackapplication',
  imports: [ CommonModule ],
  templateUrl: './trackapplication.component.html',
  styleUrls: ['./trackapplication.component.css']
})
export class TrackapplicationComponent implements OnInit {
  applications: Application[] = [];
  userId: string | null = null;
  jobSeekerId: string | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';
  applicationStatus: any = null;

  private apiUrl = 'http://localhost:5131/api/Application';
  private jobSeekerApiUrl = 'http://localhost:5131/api/JobSeeker';

  constructor(private http: HttpClient) {}

  getHeaders() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }) };
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    if (this.userId !== null) {
      this.fetchJobSeekerId();
    } else {
      this.isLoading = false;
      this.errorMessage = "User ID not found. Please log in again.";
      console.error(this.errorMessage);
    }
  }

  fetchJobSeekerId(): void {
    if (this.userId === null) {
      this.errorMessage = "User ID is missing. Cannot fetch jobseeker ID.";
      this.isLoading = false;
      console.error(this.errorMessage);
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.http.get<any>(`${this.jobSeekerApiUrl}/${this.userId}`, { headers }).subscribe({
      next: (response) => {
        this.jobSeekerId = response.jobSeekerId; // Adjust based on actual response structure
        if (this.jobSeekerId !== null) {
          this.fetchApplications();
        } else {
          this.isLoading = false;
          this.errorMessage = "Jobseeker ID not found. Please log in again.";
          console.error(this.errorMessage);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "Error fetching jobseeker ID. Please try again later.";
        console.error("Error fetching jobseeker ID:", error);
      }
    });
  }

  fetchApplications(): void {
    if (this.jobSeekerId === null) {
      this.errorMessage = "Jobseeker ID is missing. Cannot fetch applications.";
      this.isLoading = false;
      console.error(this.errorMessage);
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.http.get<Application[]>(`${this.apiUrl}/view/${this.jobSeekerId}`, { headers }).subscribe({
      next: (applications) => {
        this.applications = applications;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "Error fetching applications. Please try again later.";
        console.error("Error fetching applications:", error);
      }
    });
  }

  withdrawApplication(applicationId: number): void {
    console.log('withdrawApplication called with applicationId:', applicationId); // Add this log
    if (!applicationId) {
      alert('Application ID is undefined.');
      return;
    }

    if (!confirm('Are you sure you want to withdraw this application?')) {
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.http.delete(`${this.apiUrl}/withdraw/${applicationId}`, { headers }).subscribe({
      next: () => {
        alert('Application withdrawn successfully!');
        this.applications = this.applications.filter(app => app.applicationId !== applicationId);
      },
      error: (error) => this.handleError('Error withdrawing application.', error)
    });
  }

  trackApplicationStatus(applicationId: number): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.http.get<any>(`${this.apiUrl}/status/${applicationId}`, { headers }).subscribe({
      next: (response) => {
        this.applicationStatus = response;
        console.log('Application status:', response);
      },
      error: (error) => {
        console.error('Error tracking application status:', error);
        this.errorMessage = `Failed to track application status. Error: ${error.message}`;
      }
    });
  }

  private handleError(message: string, error?: any): void {
    this.isLoading = false;
    this.errorMessage = message;
    console.error(message, error);
  }
}





