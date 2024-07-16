import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetcoreArticlesComponent } from './netcore-articles.component';

describe('NetcoreArticlesComponent', () => {
  let component: NetcoreArticlesComponent;
  let fixture: ComponentFixture<NetcoreArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NetcoreArticlesComponent]
    });
    fixture = TestBed.createComponent(NetcoreArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
