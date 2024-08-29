import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContryTableComponent } from './contry-table.component';

describe('ContryTableComponent', () => {
  let component: ContryTableComponent;
  let fixture: ComponentFixture<ContryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContryTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
