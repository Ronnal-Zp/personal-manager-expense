import { Component, computed, input, output } from '@angular/core';
import { paletteOf } from '../../constants/category-style';

@Component({
  selector: 'app-filter-chip',
  imports: [],
  templateUrl: './filter-chip.html',
  styleUrl: './filter-chip.css',
})
export class FilterChip {
  label = input.required<string>();
  selected = input(false);
  color = input<string | null>(null);
  filterSelect = output<void>();

  chipClass = computed(() => {
    if (!this.selected()) {
      return 'bg-white text-black border border-gray-500';
    }

    const palette = paletteOf(this.color());
    return `${palette.solid} text-white`;
  });
}
