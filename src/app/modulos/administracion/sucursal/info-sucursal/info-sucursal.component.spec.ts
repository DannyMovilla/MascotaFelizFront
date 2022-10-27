import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSucursalComponent } from './info-sucursal.component';

describe('InfoSucursalComponent', () => {
  let component: InfoSucursalComponent;
  let fixture: ComponentFixture<InfoSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoSucursalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
