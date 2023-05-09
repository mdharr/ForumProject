import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TruncateTextDirective } from './truncate-text.directive';

@Component({
  template: `
    <div [appTruncateText]="maxCharacters">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
  `
})
class TestComponent {
  maxCharacters = 10;
}

describe('TruncateTextDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let divEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, TruncateTextDirective]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    divEl = fixture.debugElement.query(By.css('div'));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = divEl.injector.get(TruncateTextDirective);
    expect(directive).toBeTruthy();
  });
});
