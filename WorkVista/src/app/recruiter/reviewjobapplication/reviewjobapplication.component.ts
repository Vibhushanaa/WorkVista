/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviewjobapplication',
  imports: [ CommonModule ],
  templateUrl: './reviewjobapplication.component.html',
  styleUrl: './reviewjobapplication.component.css'
})
export class ReviewjobapplicationComponent {
  applications = [
    // Sample data
    { id: 1, candidateName: 'John Doe', email: 'john@example.com', jobTitle: 'Software Engineer', resumeUrl: '#', status: 'Pending' },
    // Add more sample data as needed
  ];

  updateStatus(id: number, status: string) {
    const application = this.applications.find(app => app.id === id);
    if (application) {
      application.status = status;
    }
  }

}*/

/*import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface Application {
  applicationId: number;
  jobId: number;
  jobSeekerId: number;
  status: string;
  appliedDate: Date;
}

@Component({
  selector: 'app-reviewjobapplication',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reviewjobapplication.component.html',
  styleUrls: ['./reviewjobapplication.component.css']
})
export class ReviewjobapplicationComponent implements OnInit {
  applicationForm: FormGroup;
  applications: Application[] = [];
  jobId: number | undefined;

  private apiUrl = 'http://localhost:5131/api/Application/applications'; // Replace with your actual API URL
  private shortlistUrl = 'http://localhost:5131/api/Application/shortlist'; // Replace with your actual API URL
  private rejectUrl = 'http://localhost:5131/api/Application/reject'; // Replace with your actual API URL
  private finalizeUrl = 'http://localhost:5131/api/Application/finalize'; // Replace with your actual API URL

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.applicationForm = this.fb.group({
      jobId: [null, Validators.required]
    });
  }

  ngOnInit(): void {}

  getApplications(): void {
    if (this.applicationForm.valid) {
      const jobId = this.applicationForm.value.jobId;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      });

      this.http.get<Application[]>(`${this.apiUrl}/${jobId}`, { headers }).pipe(
        catchError(error => {
          console.error('Error fetching applications', error);
          if (error.status === 404) {
            alert('Applications not found for the given Job ID.');
          }
          return throwError(error);
        })
      ).subscribe(
        data => {
          this.applications = data;
        }
      );
    } else {
      alert('Please enter a valid Job ID');
    }
  }

  shortlist(applicationId: number): void {
    this.updateApplicationStatus(applicationId, this.shortlistUrl);
  }

  reject(applicationId: number): void {
    this.updateApplicationStatus(applicationId, this.rejectUrl);
  }

  finalize(applicationId: number): void {
    this.updateApplicationStatus(applicationId, this.finalizeUrl);
  }

  private updateApplicationStatus(applicationId: number, url: string): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    this.http.put(`${url}/${applicationId}`, {}, { headers, responseType: 'text' }).pipe(
      tap(res => {
        console.log('Response:', res);
      }),
      map(res => {
        try {
          const parsedRes = JSON.parse(res);
          return parsedRes;
        } catch (e) {
          return res;
        }
      }),
      catchError(error => {
        console.error('Error:', error);
        return throwError(error);
      })
    ).subscribe(
      () => {
        this.getApplications(); // Refresh the list after updating
      },
      error => {
        console.error(`Error updating application ${applicationId}:`, error);
      }
    );
  }
}*/

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface JobSeeker {
  userId: number;
  fullName: string;
  email: string;
  skills: string;
  experience: string;
  location: string;
  resume: string; // Assuming resume is a URL or base64 string
}

interface Application {
  applicationId: number;
  jobId: number;
  jobSeekerId: number;
  status: string;
  appliedDate: Date;
  jobSeeker: JobSeeker; // Include job seeker details
}

@Component({
  selector: 'app-reviewjobapplication',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reviewjobapplication.component.html',
  styleUrls: ['./reviewjobapplication.component.css']
})
/*export class ReviewjobapplicationComponent implements OnInit {
  applicationForm: FormGroup;
  applications: Application[] = [];
  jobId: number | undefined;

  private apiUrl = 'http://localhost:5131/api/Application/applications'; // Replace with your actual API URL
  private shortlistUrl = 'http://localhost:5131/api/Application/shortlist'; // Replace with your actual API URL
  private rejectUrl = 'http://localhost:5131/api/Application/reject'; // Replace with your actual API URL
  private finalizeUrl = 'http://localhost:5131/api/Application/finalize'; // Replace with your actual API URL

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.applicationForm = this.fb.group({
      jobId: [null, Validators.required]
    });
  }

  ngOnInit(): void {}

  getApplications(): void {
    if (this.applicationForm.valid) {
      const jobId = this.applicationForm.value.jobId;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      });

      this.http.get<Application[]>(`${this.apiUrl}/${jobId}`, { headers }).pipe(
        catchError(error => {
          console.error('Error fetching applications', error);
          if (error.status === 404) {
            alert('Applications not found for the given Job ID.');
          }
          return throwError(error);
        })
      ).subscribe(
        data => {
          this.applications = data;
        }
      );
    } else {
      alert('Please enter a valid Job ID');
    }
  }

  shortlist(applicationId: number): void {
    this.updateApplicationStatus(applicationId, this.shortlistUrl);
  }

  reject(applicationId: number): void {
    this.updateApplicationStatus(applicationId, this.rejectUrl);
  }

  finalize(applicationId: number): void {
    this.updateApplicationStatus(applicationId, this.finalizeUrl);
  }

  private updateApplicationStatus(applicationId: number, url: string): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    this.http.put(`${url}/${applicationId}`, {}, { headers, responseType: 'text' }).pipe(
      tap(res => {
        console.log('Response:', res);
      }),
      map(res => {
        try {
          const parsedRes = JSON.parse(res);
          return parsedRes;
        } catch (e) {
          return res;
        }
      }),
      catchError(error => {
        console.error('Error:', error);
        return throwError(error);
      })
    ).subscribe(
      () => {
        this.getApplications(); // Refresh the list after updating
      },
      error => {
        console.error(`Error updating application ${applicationId}:`, error);
      }
    );
  }
}*/

export class ReviewjobapplicationComponent implements OnInit {
  applicationForm: FormGroup;
  applications: Application[] = [];
  jobId: number | undefined;
  loading = false;
  error: string | null = null;

  private apiUrl = 'http://localhost:5131/api/Application/applications'; // Replace with your actual API URL
  private shortlistUrl = 'http://localhost:5131/api/Application/shortlist'; // Replace with your actual API URL
  private rejectUrl = 'http://localhost:5131/api/Application/reject'; // Replace with your actual API URL
  private finalizeUrl = 'http://localhost:5131/api/Application/finalize'; // Replace with your actual API URL

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.applicationForm = this.fb.group({
      jobId: [null, Validators.required]
    });
  }

  ngOnInit(): void {}

  getApplications(): void {
    if (this.applicationForm.valid) {
      this.loading = true;
      this.error = null;
      const jobId = this.applicationForm.value.jobId;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      });

      this.http.get<Application[]>(`${this.apiUrl}/${jobId}`, { headers }).pipe(
        catchError(error => {
          console.error('Error fetching applications', error);
          this.error = 'Error fetching applications. Please try again later.';
          this.loading = false;
          return throwError(error);
        })
      ).subscribe(
        data => {
          this.applications = data;
          this.loading = false;
        }
      );
    } else {
      alert('Please enter a valid Job ID');
    }
  }

  shortlist(applicationId: number): void {
    this.updateApplicationStatus(applicationId, this.shortlistUrl);
  }

  reject(applicationId: number): void {
    this.updateApplicationStatus(applicationId, this.rejectUrl);
  }

  finalize(applicationId: number): void {
    this.updateApplicationStatus(applicationId, this.finalizeUrl);
  }

  private updateApplicationStatus(applicationId: number, url: string): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    this.http.put(`${url}/${applicationId}`, {}, { headers, responseType: 'text' }).pipe(
      tap(res => {
        console.log('Response:', res);
      }),
      map(res => {
        try {
          const parsedRes = JSON.parse(res);
          return parsedRes;
        } catch (e) {
          return res;
        }
      }),
      catchError(error => {
        console.error('Error:', error);
        return throwError(error);
      })
    ).subscribe(
      () => {
        this.getApplications(); // Refresh the list after updating
      },
      error => {
        console.error(`Error updating application ${applicationId}:`, error);
      }
    );
  }
}