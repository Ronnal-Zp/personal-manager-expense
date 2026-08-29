import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-filter-chip',
  imports: [],
  templateUrl: './filter-chip.html',
  styleUrl: './filter-chip.css',
})
export class FilterChip {
  label = input.required<string>();
  selected = input(false);
  filterSelect = output<void>();
}
