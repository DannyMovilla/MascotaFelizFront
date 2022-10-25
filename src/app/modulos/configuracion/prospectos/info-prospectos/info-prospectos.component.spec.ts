import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProspectosComponent } from './info-prospectos.component';

describe('InfoProspectosComponent', () => {
  let component: InfoProspectosComponent;
  let fixture: ComponentFixture<InfoProspectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoProspectosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoProspectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
