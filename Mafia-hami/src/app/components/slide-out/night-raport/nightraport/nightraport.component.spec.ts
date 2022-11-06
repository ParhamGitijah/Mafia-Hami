import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NightraportComponent } from './nightraport.component';

describe('NightraportComponent', () => {
  let component: NightraportComponent;
  let fixture: ComponentFixture<NightraportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NightraportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NightraportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
