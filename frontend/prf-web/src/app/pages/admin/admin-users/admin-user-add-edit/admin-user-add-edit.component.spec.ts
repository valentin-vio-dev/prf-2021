import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserAddEditComponent } from './admin-user-add-edit.component';

describe('AdminUserAddEditComponent', () => {
  let component: AdminUserAddEditComponent;
  let fixture: ComponentFixture<AdminUserAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
