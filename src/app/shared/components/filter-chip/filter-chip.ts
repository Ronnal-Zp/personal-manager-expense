import { Component, input } from '@angular/core';

@Component({
  selector: 'app-filter-chip',
  imports: [],
  templateUrl: './filter-chip.html',
  styleUrl: './filter-chip.css',
})
export class FilterChip {
  label = input.required<string>();
  selected = input(false);
}
