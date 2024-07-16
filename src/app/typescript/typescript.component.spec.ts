import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypescriptComponent } from './typescript.component';

describe('TypescriptComponent', () => {
  let component: TypescriptComponent;
  let fixture: ComponentFixture<TypescriptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypescriptComponent]
    });
    fixture = TestBed.createComponent(TypescriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
