import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FisicasComponent } from './fisicas.component';

describe('FisicasComponent', () => {
  let component: FisicasComponent;
  let fixture: ComponentFixture<FisicasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FisicasComponent]
    });
    fixture = TestBed.createComponent(FisicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
