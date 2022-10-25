import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRolesComponent } from './info-roles.component';

describe('InfoRolesComponent', () => {
  let component: InfoRolesComponent;
  let fixture: ComponentFixture<InfoRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
