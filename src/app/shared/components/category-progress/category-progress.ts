import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-category-progress',
  imports: [],
  templateUrl: './category-progress.html',
  styleUrl: './category-progress.css',
})
export class CategoryProgress {
  category = input.required<string>();
  colorClass = input.required<string>();
  textColorClass = input.required<string>();
  current = input.required<number>();
  max = input.required<number>();

  percentage = computed(() => Math.min(100, (this.current() / this.max()) * 100));
}
