import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  type = '';
  minPrice = 0;
  maxPrice = 10000;
  rating = 0;

  @Output() filtersChanged = new EventEmitter<any>();

  applyFilters() {
    this.filtersChanged.emit({
      type: this.type,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      rating: this.rating
    });
  }
}
