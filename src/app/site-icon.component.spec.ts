import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteIconComponent } from './site-icon.component';

describe('SiteIconComponent', () => {
  let component: SiteIconComponent;
  let fixture: ComponentFixture<SiteIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
