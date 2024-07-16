import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AspnetcoreComponent } from './aspnetcore.component';

describe('AspnetcoreComponent', () => {
  let component: AspnetcoreComponent;
  let fixture: ComponentFixture<AspnetcoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AspnetcoreComponent]
    });
    fixture = TestBed.createComponent(AspnetcoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
