import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewjobapplicationComponent } from './reviewjobapplication.component';

describe('ReviewjobapplicationComponent', () => {
  let component: ReviewjobapplicationComponent;
  let fixture: ComponentFixture<ReviewjobapplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewjobapplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewjobapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
