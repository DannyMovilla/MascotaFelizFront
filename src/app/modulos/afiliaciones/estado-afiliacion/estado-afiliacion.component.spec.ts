import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoAfiliacionComponent } from './estado-afiliacion.component';

describe('EstadoAfiliacionComponent', () => {
  let component: EstadoAfiliacionComponent;
  let fixture: ComponentFixture<EstadoAfiliacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoAfiliacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoAfiliacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
