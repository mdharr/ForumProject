import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTicketMessagesComponent } from './user-ticket-messages.component';

describe('UserTicketMessagesComponent', () => {
  let component: UserTicketMessagesComponent;
  let fixture: ComponentFixture<UserTicketMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTicketMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTicketMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
