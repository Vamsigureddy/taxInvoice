import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlArticlesNewwindowComponent } from './html-articles-newwindow.component';

describe('HtmlArticlesNewwindowComponent', () => {
  let component: HtmlArticlesNewwindowComponent;
  let fixture: ComponentFixture<HtmlArticlesNewwindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HtmlArticlesNewwindowComponent]
    });
    fixture = TestBed.createComponent(HtmlArticlesNewwindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
