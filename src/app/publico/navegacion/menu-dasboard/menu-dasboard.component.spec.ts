import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDasboardComponent } from './menu-dasboard.component';

describe('MenuDasboardComponent', () => {
  let component: MenuDasboardComponent;
  let fixture: ComponentFixture<MenuDasboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuDasboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
