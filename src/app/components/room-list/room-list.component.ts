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
      name: 'Люкс Квартира',
      description: 'З видом на море. Розташована в місті Одеса.',
      price: 2500,
      image: 'assets/rooms/lux.jpg',
      location: 'Одеса',
      type: 'квартира',
      rating: 5
    },
    {
      id: 2,
      name: 'Стандартна Кімната',
      description: 'Для двох. Розташована в місті Чернівці.',
      price: 1200,
      image: 'assets/rooms/standard.jpg',
      location: 'Чернівці',
      type: 'кімната',
      rating: 4
    },
    {
      id: 3,
      name: 'Економ Кімната',
      description: 'Дешево. Розташована в місті Вінниця.',
      price: 700,
      image: 'assets/rooms/econom.jpg',
      location: 'Вінниця',
      type: 'кімната',
      rating: 3
    },
    {
      id: 4,
      name: 'Сімейний Будинок',
      description: 'З садом та гаражем. Розташований в місті Харків.',
      price: 4000,
      image: 'assets/rooms/house.jpg',
      location: 'Харків',
      type: 'будинок',
      rating: 5
    },
    {
      id: 5,
      name: 'Модерн Квартира',
      description: 'З дизайнерським ремонтом. Центр Дніпра.',
      price: 2200,
      image: 'assets/rooms/modern.jpg',
      location: 'Дніпро',
      type: 'квартира',
      rating: 4
    },
    {
      id: 6,
      name: 'Котедж біля озера',
      description: 'З терасою та каміном. Розташований поблизу Івано-Франківська.',
      price: 5000,
      image: 'assets/rooms/cottage.jpg',
      location: 'Івано-Франківськ',
      type: 'будинок',
      rating: 5
    },
    {
      id: 7,
      name: 'Маленька Кімната для одного',
      description: 'Зручне розташування в центрі Полтави.',
      price: 600,
      image: 'assets/rooms/small.jpg',
      location: 'Полтава',
      type: 'кімната',
      rating: 3
    },
    {
      id: 8,
      name: 'Апартаменти з панорамою',
      description: 'Сучасні апартаменти з видом на місто. Розташовані в Луцьку.',
      price: 1800,
      image: 'assets/rooms/apartment.jpg',
      location: 'Луцьк',
      type: 'квартира',
      rating: 4
    },
    {
      id: 9,
      name: 'Сімейний Будиночок',
      description: 'З невеликим садом. Розташований в Чернігові.',
      price: 3500,
      image: 'assets/rooms/family_house.jpg',
      location: 'Чернігів',
      type: 'будинок',
      rating: 4
    }
  ];

  filteredRooms = [...this.rooms];

  constructor(private router: Router) { }

  goToDetail(id: number) {
    this.router.navigate(['/room', id]);
  }

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
