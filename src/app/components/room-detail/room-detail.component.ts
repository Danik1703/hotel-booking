import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { BookingService } from '../../services/booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit, AfterViewInit {
  room: any;
  isBooked = false;
  gallery: string[] = [];
  selectedRooms: any[] = [];

  rooms = [
    {
      id: 1,
      name: 'Люкс Квартира',
      description: 'З видом на море. Розташована в місті Одеса.',
      price: 2500,
      image: 'assets/rooms/lux.jpg',
      lat: 46.4825,
      lng: 30.7233,
      gallery: ['assets/rooms/lux.jpg', 'assets/rooms/lux_1.jpg', 'assets/rooms/lux_2.jpg'],
      reviews: [
        { author: 'Іван', text: 'Дуже сподобалося! Вид на море просто неймовірний.' },
        { author: 'Оля', text: 'Ідеально для романтичного відпочинку.' }
      ]
    },
    {
      id: 2,
      name: 'Стандартна Кімната',
      description: 'Для двох. Розташована в місті Чернівці.',
      price: 1200,
      image: 'assets/rooms/standard.jpg',
      lat: 48.2915,
      lng: 25.9403,
      gallery: ['assets/rooms/standard.jpg', 'assets/rooms/standart_1.jpg', 'assets/rooms/standart_2.jpg'],
      reviews: [{ author: 'Марія', text: 'Чисто, затишно і близько до центру.' }]
    },
    {
      id: 3,
      name: 'Економ Кімната',
      description: 'Дешево. Розташована в місті Вінниця.',
      price: 700,
      image: 'assets/rooms/econom.jpg',
      lat: 49.2331,
      lng: 28.4682,
      gallery: ['assets/rooms/econom.jpg', 'assets/rooms/econom_1.jpg', 'assets/rooms/econom_2.jpg'],
      reviews: []
    },
    {
      id: 4,
      name: 'Сімейний Будинок',
      description: 'З садом та гаражем. Розташований в місті Харків.',
      price: 4000,
      image: 'assets/rooms/house.jpg',
      lat: 49.9935,
      lng: 36.2304,
      gallery: ['assets/rooms/house.jpg', 'assets/rooms/house_1.jpg'],
      reviews: []
    },
    {
      id: 5,
      name: 'Модерн Квартира',
      description: 'З дизайнерським ремонтом. Центр Дніпра.',
      price: 2200,
      image: 'assets/rooms/modern.jpg',
      lat: 48.4647,
      lng: 35.0462,
      gallery: ['assets/rooms/modern.jpg', 'assets/rooms/modern_1.jpg'],
      reviews: []
    },
    {
      id: 6,
      name: 'Котедж біля озера',
      description: 'З терасою та каміном. Розташований поблизу Івано-Франківська.',
      price: 5000,
      image: 'assets/rooms/cottage.jpg',
      lat: 48.9226,
      lng: 24.7104,
      gallery: ['assets/rooms/cottage.jpg', 'assets/rooms/cottage_1.jpg'],
      reviews: []
    },
    {
      id: 7,
      name: 'Маленька Кімната для одного',
      description: 'Зручне розташування в центрі Полтави.',
      price: 600,
      image: 'assets/rooms/small.jpg',
      lat: 49.5883,
      lng: 34.5514,
      gallery: ['assets/rooms/small.jpg', 'assets/rooms/small_1.jpg'],
      reviews: []
    },
    {
      id: 8,
      name: 'Апартаменти з панорамою',
      description: 'Сучасні апартаменти з видом на місто. Розташовані в Луцьку.',
      price: 1800,
      image: 'assets/rooms/apartment.jpg',
      lat: 50.7472,
      lng: 25.3254,
      gallery: ['assets/rooms/apartment.jpg', 'assets/rooms/apartment_1.jpg'],
      reviews: []
    },
    {
      id: 9,
      name: 'Сімейний Будиночок',
      description: 'З невеликим садом. Розташований в Чернігові.',
      price: 3500,
      image: 'assets/rooms/family_house.jpg',
      lat: 51.5055,
      lng: 31.2849,
      gallery: ['assets/rooms/family_house.jpg', 'assets/rooms/family_house_1.jpg'],
      reviews: []
    }
  ];


  constructor(private route: ActivatedRoute, private bookingService: BookingService, private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.room = this.rooms.find(r => r.id === id);
    this.gallery = this.room?.gallery || [];
    this.isBooked = this.bookingService.getCart().some(r => r.id === id);

    this.selectedRooms = this.bookingService.getCart();
    if (this.room && !this.selectedRooms.some(r => r.id === this.room.id)) {
      this.selectedRooms.push(this.room);
    }
  }

  ngAfterViewInit(): void {
    if (this.selectedRooms.length) {
      this.initMap();
    }
  }

  initMap(): void {
    const firstRoom = this.selectedRooms[0];
    const map = L.map('map').setView([firstRoom.lat, firstRoom.lng], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: 'assets/maps-marker/marker-icon.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    this.selectedRooms.forEach(room => {
      L.marker([room.lat, room.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(`<strong>${room.name}</strong><br>${room.description}`);
    });

    const group = L.featureGroup(this.selectedRooms.map(r => L.marker([r.lat, r.lng])));
    map.fitBounds(group.getBounds().pad(0.5));
  }

  bookRoom(): void {
    if (!this.isBooked) {
      this.bookingService.addToCart(this.room);
      this.isBooked = true;

      Swal.fire({
        icon: 'success',
        title: 'Успіх!',
        text: `Кімната "${this.room.name}" додана до корзини!`
      });
    }
  }
}