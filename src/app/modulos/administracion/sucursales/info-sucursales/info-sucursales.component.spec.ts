import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSucursalesComponent } from './info-sucursales.component';

describe('InfoSucursalesComponent', () => {
  let component: InfoSucursalesComponent;
  let fixture: ComponentFixture<InfoSucursalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoSucursalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
