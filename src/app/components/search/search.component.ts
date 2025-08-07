import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  location = '';
  checkInDate = '';
  checkOutDate = '';
  guests = 1;

  @Output() searchParams = new EventEmitter<any>();

  search() {
    this.searchParams.emit({
      location: this.location,
      checkIn: this.checkInDate,
      checkOut: this.checkOutDate,
      guests: this.guests
    });
  }
}
