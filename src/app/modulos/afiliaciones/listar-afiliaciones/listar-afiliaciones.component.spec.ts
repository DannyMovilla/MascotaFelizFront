import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAfiliacionesComponent } from './listar-afiliaciones.component';

describe('ListarAfiliacionesComponent', () => {
  let component: ListarAfiliacionesComponent;
  let fixture: ComponentFixture<ListarAfiliacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAfiliacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarAfiliacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
