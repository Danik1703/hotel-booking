import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent {
  searchTerm: string = '';

  rooms = [
    {
      id: 1,
      name: 'Люкс',
      description: 'З видом на море. Розташована в місті Одеса.',
      price: 2500,
      image: 'assets/rooms/lux.jpg',
      location: 'Одеса',
      type: 'квартира',
      rating: 5
    },
    {
      id: 2,
      name: 'Стандарт',
      description: 'Для двох. Розташована в місті Львів.',
      price: 1200,
      image: 'assets/rooms/standard.jpg',
      location: 'Львів',
      type: 'кімната',
      rating: 4
    },
    {
      id: 3,
      name: 'Економ',
      description: 'Дешево. Розташована в місті Київ.',
      price: 700,
      image: 'assets/rooms/econom.jpg',
      location: 'Київ',
      type: 'кімната',
      rating: 3
    }
  ];


  constructor(private router: Router) { }

  goToDetail(id: number) {
    this.router.navigate(['/room', id]);
  }

  filteredRooms = [...this.rooms];



  onSearch(params: any) {
    this.filteredRooms = this.rooms.filter(room =>
      room.location.toLowerCase().includes(params.location.toLowerCase())
    );
  }


  onFilterChange(filters: any) {
    this.filteredRooms = this.rooms.filter(room =>
      (!filters.type || room.type === filters.type) &&
      (!filters.minPrice || room.price >= filters.minPrice) &&
      (!filters.maxPrice || room.price <= filters.maxPrice) &&
      (!filters.rating || room.rating >= filters.rating)
    );
  }
}
