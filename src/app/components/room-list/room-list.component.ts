import { Component } from '@angular/core';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent {
  rooms = [
    { name: 'Люкс', description: 'Просторий номер з видом на море', price: 2500, image: '/assets/rooms/lux.jpg' },
    { name: 'Стандарт', description: 'Затишний номер для двох', price: 1200, image: '/assets/rooms/standard.jpg' },
    { name: 'Економ', description: 'Недорогий номер для короткої зупинки', price: 700, image: '/assets/rooms/econom.jpg' }
  ];
}
