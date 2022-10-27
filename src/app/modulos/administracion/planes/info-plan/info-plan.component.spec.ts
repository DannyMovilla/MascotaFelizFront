import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPlanComponent } from './info-plan.component';

describe('InfoPlanComponent', () => {
  let component: InfoPlanComponent;
  let fixture: ComponentFixture<InfoPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
