import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitDashboardComponent } from './init-dashboard.component';

describe('InitDashboardComponent', () => {
  let component: InitDashboardComponent;
  let fixture: ComponentFixture<InitDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
