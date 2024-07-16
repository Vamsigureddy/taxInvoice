import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypescriptArticlesComponent } from './typescript-articles.component';

describe('TypescriptArticlesComponent', () => {
  let component: TypescriptArticlesComponent;
  let fixture: ComponentFixture<TypescriptArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypescriptArticlesComponent]
    });
    fixture = TestBed.createComponent(TypescriptArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
