import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogSpringComponent } from './catalog-spring.component';

describe('CatalogSpringComponent', () => {
  let component: CatalogSpringComponent;
  let fixture: ComponentFixture<CatalogSpringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogSpringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogSpringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
