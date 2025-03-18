import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RecruiterComponent } from './recruiter/recruiter.component';
import { CreatejobpostComponent } from './recruiter/createjobpost/createjobpost.component';
import { ReviewjobapplicationComponent } from './recruiter/reviewjobapplication/reviewjobapplication.component';
import { ScheduleinterviewComponent } from './recruiter/scheduleinterview/scheduleinterview.component';
import { JobseekerComponent } from './jobseeker/jobseeker.component';
import { SearchjobsComponent } from './jobseeker/searchjobs/searchjobs.component';
import { ApplyforjobComponent } from './jobseeker/applyforjob/applyforjob.component';
import { TrackapplicationComponent } from './jobseeker/trackapplication/trackapplication.component';
import { JobseekerprofileComponent } from './jobseeker/jobseekerprofile/jobseekerprofile.component';
import { RecruiterprofileComponent } from './recruiter/recruiterprofile/recruiterprofile.component';



export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect to home by default
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'recruiter', component: RecruiterComponent },
  { path: 'createjobpost', component: CreatejobpostComponent },
  { path: 'reviewjobapplication', component: ReviewjobapplicationComponent },
  { path: 'scheduleinterview', component: ScheduleinterviewComponent },
  { path: 'jobseeker', component: JobseekerComponent },
  { path: 'searchjobs', component: SearchjobsComponent },
  { path: 'applyforjob/:jobId', component: ApplyforjobComponent},
  { path: 'trackapplication', component: TrackapplicationComponent},
  { path: 'jobseekerprofile', component: JobseekerprofileComponent},
  { path: 'recruiterprofile', component: RecruiterprofileComponent}

];

