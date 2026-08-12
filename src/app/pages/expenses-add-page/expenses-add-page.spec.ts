import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesAddPage } from './expenses-add-page';

describe('ExpensesAddPage', () => {
  let component: ExpensesAddPage;
  let fixture: ComponentFixture<ExpensesAddPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesAddPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesAddPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
