/*import { Component } from '@angular/core';

@Component({
  selector: 'app-jobseekerprofile',
  imports: [],
  templateUrl: './jobseekerprofile.component.html',
  styleUrl: './jobseekerprofile.component.css'
})
export class JobseekerprofileComponent {

}*/

// job-seeker-profile.component.ts

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-jobseekerprofile',
  imports: [ ReactiveFormsModule],
  templateUrl: './jobseekerprofile.component.html',
  styleUrls: ['./jobseekerprofile.component.css']
})
export class JobseekerprofileComponent {
  jobSeekerForm: FormGroup;
  selectedFile: File | null = null;
  jobSeekerId: number | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.jobSeekerForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      skills: ['', Validators.required],
      experience: ['', Validators.required],
      location: ['', Validators.required],
      resume: [null, Validators.required]
    });
  }

  ngOnInit() {
    // this.fetchUserId();
  }

  fetchUserId() {
    const userID = localStorage.getItem("id");
    const apiUrl = `http://localhost:5131/api/JobSeeker/${userID}`; // Replace with your actual API URL to get user ID
    this.http.get< {jobSeekerId: number} >(apiUrl).subscribe(
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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('File selected:', this.selectedFile);
  }

  onSubmit() {
    // if (this.jobSeekerForm.valid) {
    if(true){
      console.log("submit");
      const profileData = {
        phoneNumber: this.jobSeekerForm.get('phoneNumber')?.value,
        skills: this.jobSeekerForm.get('skills')?.value,
        experience: this.jobSeekerForm.get('experience')?.value,
        location: this.jobSeekerForm.get('location')?.value,
        userId: localStorage.getItem("id")
      };

      this.createProfile(profileData).subscribe(
        response => {
          console.log('Profile created successfully', response);
          alert('Profile created successfully');
          if (this.selectedFile) {
            this.uploadResume(this.selectedFile).subscribe(
              res => {
                console.log('Resume uploaded successfully', res);
                alert('Resume uploaded successfully');
              },
              err => {
                console.error('Error uploading resume', err);
                alert('An error occurred while uploading the resume. Please try again.');
              }
            );
          }
        },
        error => {
          console.error('Error creating profile', error);
          alert('An error occurred while creating the profile. Please try again.');
        }
      );
    }
  }

  createProfile(data: any) {
    const profileUrl = 'http://localhost:5131/api/JobSeeker/register'; // Profile creation API URL
    return this.http.post(profileUrl, data, { responseType: 'text' }).pipe(
      tap(res => {
        console.log('Profile Response:', res);
      }),
      catchError(error => {
        console.error('Profile Error:', error);
        return throwError(error);
      })
    );
  }

  uploadResume(file: File) {
    this.fetchUserId();
    if (this.jobSeekerId === null) {
      console.error('Job Seeker ID is null');
      return throwError('Job Seeker ID is null');
    }

    const resumeUrl = `http://localhost:5131/api/JobSeeker/${this.jobSeekerId}/upload-resume`; // Resume upload API URL with dynamic ID
    console.log('API');
    const formData = new FormData();
    formData.append('file', file, file.name);

    console.log('Uploading file:', file.name);

    return this.http.post(resumeUrl, formData).pipe(
      tap(res => {
        console.log('Resume Response:', res);
      }),
      catchError(error => {
        console.error('Resume Error:', error);
        return throwError(error);
      })
    );
  }
}