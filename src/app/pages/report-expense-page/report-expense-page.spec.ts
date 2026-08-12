import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportExpensePage } from './report-expense-page';

describe('ReportExpensePage', () => {
  let component: ReportExpensePage;
  let fixture: ComponentFixture<ReportExpensePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportExpensePage],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportExpensePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
