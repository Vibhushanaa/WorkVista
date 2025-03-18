/*import { Component } from '@angular/core';

@Component({
  selector: 'app-applyforjob',
  imports: [],
  templateUrl: './applyforjob.component.html',
  styleUrl: './applyforjob.component.css'
})
export class ApplyforjobComponent {

}*/

/*import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-applyforjob',
  imports: [ CommonModule ],
  templateUrl: './applyforjob.component.html',
  styleUrls: ['./applyforjob.component.css']
})
export class ApplyforjobComponent implements OnInit {
  application = {
    jobId: null,
    jobSeekerId: null
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchApplicationDetails();
  }

  fetchApplicationDetails() {
    this.http.get('/api/application/details')
      .subscribe((data: any) => {
        this.application.jobId = data.jobId;
        this.application.jobSeekerId = data.jobSeekerId;
      }, error => {
        console.error('Error fetching application details', error);
      });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.application.jobId && this.application.jobSeekerId) {
      this.http.post('/api/application/apply', this.application)
        .subscribe(response => {
          console.log('Application submitted successfully', response);
        }, error => {
          console.error('Error submitting application', error);
        });
    }
  }
}*/

/*import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-applyforjob',
  templateUrl: './applyforjob.component.html',
  styleUrls: ['./applyforjob.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ApplyforjobComponent implements OnInit {
  application = {
    jobId: null as number | null,
    jobSeekerId: null as number | null
  };

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.application.jobId = +params['jobId'];
      this.fetchApplicationDetails(params['jobSeekerId']);
    });
  }

  fetchApplicationDetails(jobSeekerId: number) {
    this.http.get(`http://localhost:5131/api/Application/view/${jobSeekerId}`)
      .subscribe((data: any) => {
        this.application.jobSeekerId = data.jobSeekerId;
      }, (error: HttpErrorResponse) => {
        console.error('Error fetching application details', error);
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          console.error('Client-side error:', error.error.message);
        } else {
          // Server-side error
          console.error('Server-side error:', error);
          if (error.status === 200 && error.error.text) {
            console.error('Received HTML instead of JSON:', error.error.text);
          }
        }
      });
  }

  onSubmit(form: NgForm) {
    if (this.application.jobId && this.application.jobSeekerId) {
      this.http.post('http://localhost:5131/api/application/apply', this.application)
        .subscribe(response => {
          console.log('Application submitted successfully', response);
        }, error => {
          console.error('Error submitting application', error);
        });
    }
  }
}*/


/*import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-applyforjob',
  templateUrl: './applyforjob.component.html',
  styleUrls: ['./applyforjob.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ApplyforjobComponent implements OnInit {
  jobId: number | null = null;
  jobSeekerId: number | null = null;
  resumeFile: File | null = null;
  private apiUrl = 'http://localhost:5131/api/Application';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.jobId = Number(this.route.snapshot.paramMap.get('jobId'));
    this.fetchUserId();
    console.log('Job ID:', this.jobId); // Debugging statement
  }

  fetchUserId() {
    const userID = localStorage.getItem("id");
    const apiUrl = `http://localhost:5131/api/JobSeeker/${userID}`; // Replace with your actual API URL to get user ID
    this.http.get<{ jobSeekerId: number }>(apiUrl).subscribe(
      data => {
        console.log(data);
        this.jobSeekerId = data.jobSeekerId;
      },
      error => {
        console.error('Error fetching user ID', error);
      }
    );
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    if (token) {
      return { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) };
    } else {
      alert('No token found. Please log in.');
      this.router.navigate(['/login']);
      return { headers: new HttpHeaders() };
    }
  }

  onFileSelected(event: any) {
    this.resumeFile = event.target.files[0];
  }

  applyForJob() {
    if (this.resumeFile && this.jobSeekerId && this.jobId) {
      const formData = new FormData();
      formData.append('resume', this.resumeFile);
      formData.append('jobSeekerId', this.jobSeekerId.toString());

      console.log('Applying for job with ID:', this.jobId); // Debugging statement

      this.http.post(`${this.apiUrl}/apply/${this.jobId}`, formData, this.getHeaders())
        .subscribe(() => {
          alert('Application submitted successfully!');
          this.router.navigate(['/jobseeker-dashboard']);
        }, (error: HttpErrorResponse) => {
          console.error('Error submitting application', error);
          alert('Failed to submit application. Please try again.');
        });
    } else {
      alert('Please select a resume file and ensure job seeker ID and job ID are fetched.');
    }
  }
}*/





import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-applyforjob',
  templateUrl: './applyforjob.component.html',
  styleUrls: ['./applyforjob.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ApplyforjobComponent implements OnInit {
  jobId: number | null = null;
  jobSeekerId: number | null = null;
  resumeFile: File | null = null;
  resumeUploaded: boolean = false;
  private uploadResumeUrl = 'http://localhost:5131/api/JobSeeker'; // Base URL for JobSeeker API
  private applyUrl = 'http://localhost:5131/api/Application/apply'; // API endpoint for application submission

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchIds();
    console.log('Job ID:', this.jobId); // Debugging statement
    console.log('Job Seeker ID:', this.jobSeekerId); // Debugging statement
  }

  fetchIds() {
    this.jobId = Number(this.route.snapshot.paramMap.get('jobId'));
    const userID = localStorage.getItem("id");
    const apiUrl = `http://localhost:5131/api/JobSeeker/${userID}`; // Replace with your actual API URL to get user ID
    this.http.get<{ jobSeekerId: number }>(apiUrl).subscribe(
      data => {
        console.log("jobseekerID");
        console.log(data);
        this.jobSeekerId = data.jobSeekerId;
        console.log(data.jobSeekerId);
      },
      error => {
        console.error('Error fetching user ID', error);
      }
    );
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    if (token) {
      return { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) };
    } else {
      alert('No token found. Please log in.');
      this.router.navigate(['/login']);
      return { headers: new HttpHeaders() };
    }
  }

  onFileSelected(event: any) {
    this.resumeFile = event.target.files[0];
  }

  uploadResume() {
    if (this.resumeFile && this.jobSeekerId !== null) {
      const formData = new FormData();
      formData.append('file', this.resumeFile);

      console.log('Uploading resume for Job Seeker ID:', this.jobSeekerId); // Debugging statement

      this.http.post(`${this.uploadResumeUrl}/${this.jobSeekerId}/upload-resume`, formData, this.getHeaders())
        .subscribe(() => {
          console.log('Resume uploaded successfully');
          alert('Resume uploaded successfully!');
          this.resumeUploaded = true;
        }, (error: HttpErrorResponse) => {
          console.error('Error uploading resume', error);
          alert('Failed to upload resume. Please try again.');
          this.resumeUploaded = false;
        });
    } else {
      alert('Please select a resume file and ensure job seeker ID is fetched.');
    }
  }

  /*submitApplication() {
    if (this.resumeUploaded && this.jobSeekerId !== null && this.jobId !== null) {
      const applicationData = {
        applicationId: 0,
        jobSeekerId: this.jobSeekerId,
        jobId: this.jobId,
        appliedDate: new Date().toISOString(),
        status: 'Pending'
      };
  
      console.log('Applying for job with Job Seeker ID:', this.jobSeekerId); // Debugging statement
  
      this.http.post(this.applyUrl, applicationData, this.getHeaders())
        .subscribe(() => {
          alert('Application submitted successfully!');
          this.router.navigate(['/jobseeker-dashboard']);
        }, (error: HttpErrorResponse) => {
          console.error('Error submitting application', error);
          alert('Failed to submit application. Please try again.');
        });
    } else {
      alert('Please ensure the resume is uploaded and job seeker ID and job ID are fetched.');
    }
  }
}*/

submitApplication() {
  if (this.resumeUploaded && this.jobSeekerId !== null && this.jobId !== null) {
    const applicationData = {
      applicationId: 0,
      jobSeekerId: this.jobSeekerId,
      jobId: this.jobId,
      appliedDate: new Date().toISOString(),
      status: 'Pending'
    };

    console.log('Applying for job with Job Seeker ID:', this.jobSeekerId); // Debugging statement
    console.log('Application Data:', applicationData); // Debugging statement

    this.http.post(this.applyUrl, applicationData, this.getHeaders())
      .subscribe(() => {
        alert('Application submitted successfully!');
        this.router.navigate(['/jobseeker-dashboard']);
      }, (error: HttpErrorResponse) => {
        console.error('Error submitting application', error);
        alert('Failed to submit application. Please try again.');
      });
  } else {
    alert('Please ensure the resume is uploaded and job seeker ID and job ID are fetched.');
  }
}
}