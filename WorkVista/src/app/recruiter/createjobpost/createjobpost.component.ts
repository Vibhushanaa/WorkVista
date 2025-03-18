/*\import { Component } from '@angular/core';

@Component({
  selector: 'app-createjobpost',
  imports: [],
  templateUrl: './createjobpost.component.html',
  styleUrl: './createjobpost.component.css'
})
export class CreatejobpostComponent {

}*/


/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createjobpost',
  imports: [ CommonModule,FormsModule],
  templateUrl: './createjobpost.component.html',
  styleUrl: './createjobpost.component.css'
})
export class CreatejobpostComponent {
  jobPosts: any[] = [
    {
      id: 1,
      title: 'Software Engineer',
      description: 'Develop and maintain web applications.',
      location: 'Hyderabad',
      salary: 60000,
      experience: '2-4 years',
      jobType: 'Full-time',
      jobCategory: 'IT',
      status: 'Open'
    },
    {
      id: 2,
      title: 'Project Manager',
      description: 'Manage software development projects.',
      location: 'Bangalore',
      salary: 80000,
      experience: '5-7 years',
      jobType: 'Full-time',
      jobCategory: 'Management',
      status: 'Open'
    },
    {
      id: 3,
      title: 'Data Analyst',
      description: 'Analyze and interpret complex data sets.',
      location: 'Mumbai',
      salary: 50000,
      experience: '1-3 years',
      jobType: 'Part-time',
      jobCategory: 'Analytics',
      status: 'Filled'
    }
  ];

  constructor(private router: Router) {}

  createJobPost() {
    this.router.navigate(['/create-job']);
  }

  editJobPost(jobId: number) {
    this.router.navigate(['/edit-job', jobId]);
  }

  deleteJobPost(jobId: number) {
    this.jobPosts = this.jobPosts.filter(job => job.id !== jobId);
    alert('Job post deleted successfully.');
  }

  updateStatus(jobId: number, status: string) {
    const job = this.jobPosts.find(job => job.id === jobId);
    if (job) {
      job.status = status;
    }
    alert('Job status updated successfully.');
  }

}
*/

/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-createjobpost',
  imports: [ CommonModule,FormsModule],
  templateUrl: './createjobpost.component.html',
  styleUrl: './createjobpost.component.css'
})
export class CreatejobpostComponent {
  private apiUrl = 'http://localhost:5131//api/JobPost';
  

  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  getJobById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createJob(jobPost: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, jobPost);
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  searchJobs(params: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search`, { params });
  }
}*/

/*import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-createjobpost',
  imports: [ReactiveFormsModule],
  templateUrl: './createjobpost.component.html',
  styleUrls: ['./createjobpost.component.css']
})
export class CreatejobpostComponent {
  jobForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.jobForm = this.fb.group({
      recruiterId: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      salary: [0, Validators.required],
      experience: ['', Validators.required],
      jobType: ['', Validators.required],
      jobCategory: ['', Validators.required],
      postedDate: [new Date(), Validators.required]
    });
  }

  onSubmit() {
    if (this.jobForm.valid) {
      const formData = this.jobForm.value;
      this.createJob(formData).subscribe(
        response => {
          console.log('Job created successfully', response);
          alert('Job created successfully');
        },
        error => {
          console.error('Error creating job', error);
          alert('An error occurred while creating the job. Please try again.');
        }
      );
    }
  }

  createJob(data: any) {
    const apiUrl = 'http://localhost:5131/api/JobPost/create';
    return this.http.post(apiUrl, JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json',Authorization: `Bearer ${localStorage.getItem('token')}` },
      responseType: 'text' // Specify response type as text
    }).pipe(
      tap(res => {
        console.log('Response:', res);
      }),
      map(res => {
        // Manually parse the response if needed
        try {
          const parsedRes = JSON.parse(res);
          return parsedRes;
        } catch (e) {
          return res; // Return as text if parsing fails
        }
      }),
      catchError(error => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }
}*/

/*import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-createjobpost',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './createjobpost.component.html',
  styleUrls: ['./createjobpost.component.css']
})
export class CreatejobpostComponent implements OnInit {
  jobForm: FormGroup;
  jobs: any[] = [];
  

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.jobForm = this.fb.group({
      jobId: [null],
      recruiterId: ['', Validators.required],
      companyName: ['', Validators.required], 
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      salary: [0, Validators.required],
      experience: ['', Validators.required],
      jobType: ['', Validators.required],
      jobCategory: ['', Validators.required],
      postedDate: [new Date(), Validators.required]
    });
  }

  ngOnInit(): void {
    this.getJobs();
  }

  getJobs(): void {
    const apiUrl = 'http://localhost:5131/api/JobPost/all';
    this.http.get<any[]>(apiUrl).subscribe(
      data => {
        this.jobs = data;
      },
      error => {
        console.error('Error fetching job posts', error);
      }
    );
  }

  onSubmit() {
    if (this.jobForm.valid) {
      const formData = this.jobForm.value;
      if (formData.jobId) {
        this.updateJob(formData).subscribe(
          response => {
            console.log('Job updated successfully', response);
            alert('Job updated successfully');
            this.getJobs(); // Refresh the job list
          },
          error => {
            console.error('Error updating job', error);
            alert('An error occurred while updating the job. Please try again.');
          }
        );
      } else {
        this.createJob(formData).subscribe(
          response => {
            console.log('Job created successfully', response);
            alert('Job created successfully');
            this.getJobs(); // Refresh the job list
          },
          error => {
            console.error('Error creating job', error);
            alert('An error occurred while creating the job. Please try again.');
          }
        );
      }
    }
  }

  createJob(data: any) {
    const apiUrl = 'http://localhost:5131/api/JobPost/create';
    const token = localStorage.getItem('authToken'); // Retrieve the token
    const headers = new HttpHeaders({'Content-Type': 'application/json',Authorization: `Bearer ${localStorage.getItem('token')}`});

    return this.http.post(apiUrl, JSON.stringify(data), { headers, responseType: 'text' }).pipe(
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
    );
  }

  updateJob(data: any) {
    const apiUrl = `http://localhost:5131/api/JobPost/update/${data.jobId}`;
    const token = localStorage.getItem('authToken'); // Retrieve the token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.put(apiUrl, JSON.stringify(data), { headers, responseType: 'text' }).pipe(
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
    );
  }

  deleteJob(jobId: number) {
    const apiUrl = `http://localhost:5131/api/JobPost/delete/${jobId}`;
    const token = localStorage.getItem('authToken'); // Retrieve the token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.delete(apiUrl, { headers, responseType: 'text' }).pipe(
      tap(res => {
        console.log('Response:', res);
        this.getJobs(); // Refresh the job list
      }),
      catchError(error => {
        console.error('Error:', error);
        return throwError(error);
      })
    ).subscribe(
      response => {
        console.log('Job deleted successfully', response);
        alert('Job deleted successfully');
      },
      error => {
        console.error('Error deleting job', error);
        alert('An error occurred while deleting the job. Please try again.');
      }
    );
  }

  editJob(job: any) {
    this.jobForm.patchValue(job);
  }
}*/

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createjobpost',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './createjobpost.component.html',
  styleUrls: ['./createjobpost.component.css']
})
export class CreatejobpostComponent implements OnInit {
  jobForm: FormGroup;
  jobs: any[] = [];
  showJobForm = false; // Boolean flag to control form visibility

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.jobForm = this.fb.group({
      jobId: [null],
      recruiterId: ['', Validators.required],
      companyName: ['', Validators.required], 
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      salary: [0, Validators.required],
      experience: ['', Validators.required],
      jobType: ['', Validators.required],
      jobCategory: ['', Validators.required],
      postedDate: [new Date().toISOString().split('T')[0], Validators.required] // Format date as yyyy-MM-dd
    });
  }

  ngOnInit(): void {
    this.getJobs();
  }

  getJobs(): void {
    const apiUrl = 'http://localhost:5131/api/JobPost/all';
    this.http.get<any[]>(apiUrl).subscribe(
      data => {
        this.jobs = data;
      },
      error => {
        console.error('Error fetching job posts', error);
      }
    );
  }

  toggleJobForm() {
    this.showJobForm = !this.showJobForm;
    if (this.showJobForm) {
      this.prepareNewJob();
    }
  }

  prepareNewJob() {
    const formattedDate = new Date().toISOString().split('T')[0]; // Format date as yyyy-MM-dd
    this.jobForm.reset({
      jobId: null,
      recruiterId: '',
      companyName: '',
      title: '',
      description: '',
      location: '',
      salary: 0,
      experience: '',
      jobType: '',
      jobCategory: '',
      postedDate: formattedDate
    });
  }

  onSubmit() {
    if (this.jobForm.valid) {
      const formData = this.jobForm.value;
      if (formData.jobId) {
        this.updateJob(formData).subscribe(
          response => {
            console.log('Job updated successfully', response);
            alert('Job updated successfully');
            this.getJobs(); // Refresh the job list
            this.router.navigate(['/job-list']); // Navigate to job list or another route
          },
          error => {
            console.error('Error updating job', error);
            alert('An error occurred while updating the job. Please try again.');
          }
        );
      } else {
        this.createJob(formData).subscribe(
          response => {
            console.log('Job created successfully', response);
            alert('Job created successfully');
            this.getJobs(); // Refresh the job list
            this.router.navigate(['/job-list']); // Navigate to job list or another route
          },
          error => {
            console.error('Error creating job', error);
            alert('An error occurred while creating the job. Please try again.');
          }
        );
      }
    }
  }

  createJob(data: any) {
    const apiUrl = 'http://localhost:5131/api/JobPost/create';
    const token = localStorage.getItem('authToken'); // Retrieve the token
    const headers = new HttpHeaders({'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}`});

    return this.http.post(apiUrl, JSON.stringify(data), { headers, responseType: 'text' }).pipe(
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
    );
  }

  updateJob(data: any) {
    const apiUrl = `http://localhost:5131/api/JobPost/update/${data.jobId}`;
    const token = localStorage.getItem('authToken'); // Retrieve the token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.put(apiUrl, JSON.stringify(data), { headers, responseType: 'text' }).pipe(
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
    );
  }

  deleteJob(jobId: number) {
    const apiUrl = `http://localhost:5131/api/JobPost/delete/${jobId}`;
    const token = localStorage.getItem('authToken'); // Retrieve the token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.delete(apiUrl, { headers, responseType: 'text' }).pipe(
      tap(res => {
        console.log('Response:', res);
        this.getJobs(); // Refresh the job list
      }),
      catchError(error => {
        console.error('Error:', error);
        return throwError(error);
      })
    ).subscribe(
      response => {
        console.log('Job deleted successfully', response);
        alert('Job deleted successfully');
      },
      error => {
        console.error('Error deleting job', error);
        alert('An error occurred while deleting the job. Please try again.');
      }
    );
  }

  editJob(job: any) {
    this.jobForm.patchValue(job);
  }
}