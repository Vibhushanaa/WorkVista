import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterprofileComponent } from './recruiterprofile.component';

describe('RecruiterprofileComponent', () => {
  let component: RecruiterprofileComponent;
  let fixture: ComponentFixture<RecruiterprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterprofileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
