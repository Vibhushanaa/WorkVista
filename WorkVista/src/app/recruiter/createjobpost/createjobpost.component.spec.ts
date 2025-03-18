import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatejobpostComponent } from './createjobpost.component';

describe('CreatejobpostComponent', () => {
  let component: CreatejobpostComponent;
  let fixture: ComponentFixture<CreatejobpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatejobpostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatejobpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
