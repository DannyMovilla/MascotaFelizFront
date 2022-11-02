import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAfiliacionComponent } from './info-afiliacion.component';

describe('InfoAfiliacionComponent', () => {
  let component: InfoAfiliacionComponent;
  let fixture: ComponentFixture<InfoAfiliacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoAfiliacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoAfiliacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
