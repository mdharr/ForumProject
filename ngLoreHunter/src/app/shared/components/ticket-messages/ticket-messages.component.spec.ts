import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketMessagesComponent } from './ticket-messages.component';

describe('TicketMessagesComponent', () => {
  let component: TicketMessagesComponent;
  let fixture: ComponentFixture<TicketMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
