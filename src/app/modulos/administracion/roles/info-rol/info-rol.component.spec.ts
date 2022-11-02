import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRolComponent } from './info-rol.component';

describe('InfoRolComponent', () => {
  let component: InfoRolComponent;
  let fixture: ComponentFixture<InfoRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoRolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
