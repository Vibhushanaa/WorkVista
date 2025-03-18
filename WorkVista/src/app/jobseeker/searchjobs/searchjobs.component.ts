/*import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchjobs',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './searchjobs.component.html',
  styleUrl: './searchjobs.component.css'
})
export class SearchjobsComponent {
  searchForm: FormGroup;
  filteredJobs: any[] = [];

  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      title: [''],
      location: [''],
      experience: [''],
      jobType: [''],
      jobCategory: [''],
      minSalary: [0]
    });
  }

  onSearch() {
    // Implement your search logic here
    // For demonstration, we'll use mock data
    this.filteredJobs = [
      { id: 1, title: 'Software Engineer', description: 'Develop and maintain web applications.', location: 'Hyderabad', experience: '2-4 years', jobType: 'Full-time', jobCategory: 'IT', salary: 60000 },
      { id: 2, title: 'Project Manager', description: 'Manage software development projects.', location: 'Bangalore', experience: '5-7 years', jobType: 'Full-time', jobCategory: 'Management', salary: 80000 },
      { id: 3, title: 'Data Analyst', description: 'Analyze and interpret complex data sets.', location: 'Mumbai', experience: '1-3 years', jobType: 'Part-time', jobCategory: 'Analytics', salary: 50000 }
    ];
    
  }
  

  applyForJob(jobId: number) {
    this.router.navigate(['/apply-job', jobId]);
  }
}
*/



/*import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface JobPostDTO {
  jobId: number;
  recruiterId: number;
  title: string;
  description: string;
  location: string;
  salary: number;
  experience: string;
  jobType: string;
  jobCategory: string;
  postedDate: Date;
}

@Component({
  selector: 'app-searchjobs',
  templateUrl: './searchjobs.component.html',
  styleUrls: ['./searchjobs.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SearchjobsComponent implements OnInit {
  searchCriteria = {
    title: '',
    location: '',
    experience: '',
    jobType: '',
    jobCategory: '',
    minSalary: null as number | null
  };

  jobs: JobPostDTO[] = [];
  job: JobPostDTO | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllJobs();
  }

  getAllJobs(): void {
    this.http.get<JobPostDTO[]>('http://localhost:5131/api/JobPost/all')
      .subscribe(data => {
        this.jobs = data;
      });
  }

  getJobById(id: number): void {
    this.http.get<JobPostDTO>(`http://localhost:5131/api/JobPost/${id}`)
      .subscribe(data => {
        this.job = data;
      }, error => {
        console.error('Job not found', error);
      });
  }

  onSearch(): void {
    const params: any = {
      title: this.searchCriteria.title,
      location: this.searchCriteria.location,
      experience: this.searchCriteria.experience,
      jobType: this.searchCriteria.jobType,
      jobCategory: this.searchCriteria.jobCategory
    };

    if (this.searchCriteria.minSalary !== null) {
      params.minSalary = this.searchCriteria.minSalary.toString();
    }

    this.http.get<JobPostDTO[]>('http://localhost:5131/api/JobPost/search', { params })
      .subscribe(data => {
        this.jobs = data;
      });
  }
}*/

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface JobPostDTO {
  jobId: number;
  recruiterId: number;
  title: string;
  description: string;
  location: string;
  salary: number;
  experience: string;
  jobType: string;
  jobCategory: string;
  postedDate: Date;
}

@Component({
  selector: 'app-searchjobs',
  templateUrl: './searchjobs.component.html',
  styleUrls: ['./searchjobs.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SearchjobsComponent implements OnInit {
  searchCriteria = {
    title: '',
    location: '',
    experience: '',
    jobType: '',
    jobCategory: '',
    minSalary: null as number | null
  };

  jobs: JobPostDTO[] = [];
  job: JobPostDTO | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getAllJobs();
  }

  getAllJobs(): void {
    this.http.get<JobPostDTO[]>('http://localhost:5131/api/JobPost/all')
      .subscribe(data => {
        this.jobs = data;
      });
  }

  getJobById(id: number): void {
    this.http.get<JobPostDTO>(`http://localhost:5131/api/JobPost/${id}`)
      .subscribe(data => {
        this.job = data;
      }, error => {
        console.error('Job not found', error);
      });
  }

  onSearch(): void {
    const params: any = {
      title: this.searchCriteria.title,
      location: this.searchCriteria.location,
      experience: this.searchCriteria.experience,
      jobType: this.searchCriteria.jobType,
      jobCategory: this.searchCriteria.jobCategory
    };

    if (this.searchCriteria.minSalary !== null) {
      params.minSalary = this.searchCriteria.minSalary.toString();
    }

    this.http.get<JobPostDTO[]>('http://localhost:5131/api/JobPost/search', { params })
      .subscribe(data => {
        this.jobs = data;
      });
  }

  applyForJob(job: JobPostDTO) {
    this.router.navigate(['/applyforjob', job.jobId]);
  }
}