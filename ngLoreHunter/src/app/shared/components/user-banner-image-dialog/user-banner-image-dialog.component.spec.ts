import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBannerImageDialogComponent } from './user-banner-image-dialog.component';

describe('UserBannerImageDialogComponent', () => {
  let component: UserBannerImageDialogComponent;
  let fixture: ComponentFixture<UserBannerImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBannerImageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBannerImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
