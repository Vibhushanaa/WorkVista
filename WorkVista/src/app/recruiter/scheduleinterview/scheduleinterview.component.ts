import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-scheduleinterview',
  imports: [ReactiveFormsModule],
  templateUrl: './scheduleinterview.component.html',
  styleUrls: ['./scheduleinterview.component.css']
})
export class ScheduleinterviewComponent {
  interviewForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.interviewForm = this.fb.group({
      applicationId: ['', Validators.required],
      interviewDate: ['', Validators.required],
      interviewMode: ['', Validators.required],
      interviewLocation: [''],
      status: ['Scheduled'] // Default status
    });
  }

  onSubmit() {
    if (this.interviewForm.valid) {
      const formData = this.interviewForm.value;
      this.scheduleInterview(formData).subscribe(
        response => {
          console.log('Interview scheduled successfully', response);
          alert('Interview scheduled successfully');
        },
        error => {
          console.error('Error scheduling interview', error);
          alert('An error occurred while scheduling the interview. Please try again.');
        }
      );
    }
  }

  scheduleInterview(data: any) {
    const apiUrl = 'http://localhost:5131/api/Interview/Schedule';
    return this.http.post(apiUrl, JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
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
}