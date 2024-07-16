import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlArticlesComponent } from './html-articles.component';

describe('HtmlArticlesComponent', () => {
  let component: HtmlArticlesComponent;
  let fixture: ComponentFixture<HtmlArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HtmlArticlesComponent]
    });
    fixture = TestBed.createComponent(HtmlArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
