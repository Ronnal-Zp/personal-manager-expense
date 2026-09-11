import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment';
import { CategoriesPage } from './categories-page';

/** Forma real que devuelve el backend: `icon` y `text_color` pueden venir nulos. */
const CATEGORIES_RESPONSE = {
  data: [
    { budget_Limit: 80, color: 'bg-blue-400', icon: null, id: 1, name: 'Transporte', text_color: null, user_owner: 1 },
    { budget_Limit: 100, color: 'bg-emerald-400', icon: null, id: 2, name: 'Almuerzo', text_color: null, user_owner: 1 },
  ],
  meta: { limit: 255, page: 1, totalItems: 2, totalPages: 1 },
};

const TOTALS_RESPONSE = {
  data: [{ budgetLimit: 80, categoryId: 1, categoryName: 'Transporte', total: 120 }],
  meta: { limit: 0, page: 1, totalItems: 1, totalPages: 1 },
};

describe('CategoriesPage', () => {
  let component: CategoriesPage;
  let fixture: ComponentFixture<CategoriesPage>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesPage],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesPage);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();

    httpMock.expectOne(r => r.url === `${environment.BASE_URL}/category`).flush(CATEGORIES_RESPONSE);
    httpMock.expectOne(`${environment.BASE_URL}/expense/totalByCategory`).flush(TOTALS_RESPONSE);

    await fixture.whenStable();
  });

  afterEach(() => httpMock.verify());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('pide las categorías paginadas como exige el backend', () => {
    expect(component.categories().length).toBe(2);
  });

  it('renderiza una fila por categoría con su límite', () => {
    const html = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(html).toContain('Transporte');
    expect(html).toContain('Almuerzo');
    expect(html).toContain('$80.00');
    expect(html).toContain('$100.00');
  });

  it('deriva el tinte y el color de texto cuando `text_color` viene nulo', () => {
    const [transporte, almuerzo] = component.rows();

    expect(transporte.softClass).toBe('bg-blue-100');
    expect(transporte.textClass).toBe('text-blue-800');
    expect(transporte.solidClass).toBe('bg-blue-400');

    expect(almuerzo.softClass).toBe('bg-emerald-100');
    expect(almuerzo.solidClass).toBe('bg-emerald-400');
  });

  it('marca como excedida la categoría cuyo gasto supera el límite', () => {
    const [transporte, almuerzo] = component.rows();

    expect(transporte.spent).toBe(120);
    expect(transporte.overBudget).toBe(true);
    expect(component.usagePercentage(transporte)).toBe(100);

    expect(almuerzo.spent).toBe(0);
    expect(almuerzo.overBudget).toBe(false);
  });

  it('suma el presupuesto asignado de todas las categorías', () => {
    expect(component.totalBudget()).toBe(180);
  });

  it('precarga el formulario al editar y lo limpia al cancelar', () => {
    component.startEdit(component.rows()[1]);

    expect(component.isEditing()).toBe(true);
    expect(component.formCategory.getRawValue()).toEqual({ name: 'Almuerzo', budget_Limit: 100 });
    expect(component.selectedPalette().id).toBe('emerald');

    component.cancelEdit();

    expect(component.isEditing()).toBe(false);
    expect(component.formCategory.getRawValue()).toEqual({ name: '', budget_Limit: 0 });
    expect(component.selectedPalette().id).toBe('blue');
  });

  it('crea una categoría con el payload que espera el swagger', () => {
    component.formCategory.setValue({ name: '  Mascotas  ', budget_Limit: 40 });
    component.selectIcon('pet');
    component.selectPalette(component.palettes[4]);

    component.onSave();

    const req = httpMock.expectOne(`${environment.BASE_URL}/category`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      name: 'Mascotas',
      budget_Limit: 40,
      icon: 'pet',
      color: 'bg-violet-400',
      text_color: 'text-violet-800',
    });
  });

  it('actualiza por id cuando el formulario está en modo edición', () => {
    component.startEdit(component.rows()[0]);
    component.formCategory.patchValue({ budget_Limit: 150 });

    component.onSave();

    const req = httpMock.expectOne(`${environment.BASE_URL}/category/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({
      name: 'Transporte',
      budget_Limit: 150,
      icon: 'tag',
      color: 'bg-blue-400',
      text_color: 'text-blue-800',
    });
  });

  it('no envía nada si el formulario es inválido', () => {
    component.formCategory.setValue({ name: '', budget_Limit: 0 });

    component.onSave();

    httpMock.expectNone(`${environment.BASE_URL}/category`);
  });
});
