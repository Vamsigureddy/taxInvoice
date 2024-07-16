import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseupdatesComponent } from './courseupdates.component';

describe('CourseupdatesComponent', () => {
  let component: CourseupdatesComponent;
  let fixture: ComponentFixture<CourseupdatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseupdatesComponent]
    });
    fixture = TestBed.createComponent(CourseupdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
