import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomealertComponent } from './homealert.component';

describe('HomealertComponent', () => {
  let component: HomealertComponent;
  let fixture: ComponentFixture<HomealertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomealertComponent]
    });
    fixture = TestBed.createComponent(HomealertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
