import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NightComponent } from './night.component';

describe('NightComponent', () => {
  let component: NightComponent;
  let fixture: ComponentFixture<NightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
