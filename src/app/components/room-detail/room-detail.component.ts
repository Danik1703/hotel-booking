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

  rooms = [
    {
      id: 1,
      name: 'Люкс',
      description: 'Простора квартира з видом на море.',
      price: 2500,
      image: 'assets/rooms/lux.jpg',
      lat: 46.4825,
      lng: 30.7233,
      reviews: [
        { author: 'Іван', text: 'Дуже сподобалося! Вид на море просто неймовірний.' },
        { author: 'Оля', text: 'Ідеально для романтичного відпочинку.' }
      ],
      gallery: [
        'assets/rooms/lux.jpg',
        'assets/rooms/lux_1.jpg',
        'assets/rooms/lux_2.jpg'
      ]
    },
    {
      id: 2,
      name: 'Стандарт',
      description: 'Зручна кімната для двох у центрі міста.',
      price: 1200,
      image: 'assets/rooms/standard.jpg',
      lat: 49.8419,
      lng: 24.0315,
      reviews: [
        { author: 'Марія', text: 'Чисто, затишно і близько до центру.' }
      ],
      gallery: [
        'assets/rooms/standard.jpg',
        'assets/rooms/standart_1.jpg',
        'assets/rooms/standart_2.jpg'
      ]
    },
    {
      id: 3,
      name: 'Економ',
      description: 'Дешевий варіант для короткого перебування.',
      price: 700,
      image: 'assets/rooms/econom.jpg',
      lat: 50.4501,
      lng: 30.5234,
      reviews: [],
      gallery: [
        'assets/rooms/econom.jpg',
        'assets/rooms/econom_1.jpg',
        'assets/rooms/econom_2.jpg'
      ]
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.room = this.rooms.find(r => r.id === id);
    this.gallery = this.room?.gallery || [];
    this.isBooked = this.bookingService.getCart().some(r => r.id === id);
  }

  ngAfterViewInit(): void {
    if (this.room) {
      this.initMap();
    }
  }

  initMap(): void {
    const map = L.map('map').setView([this.room.lat, this.room.lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: 'assets/maps-marker/marker-icon.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    L.marker([this.room.lat, this.room.lng], { icon: customIcon }).addTo(map)
      .bindPopup(this.room.name)
      .openPopup();
  }

  bookRoom(): void {
    if (!this.isBooked) {
      this.bookingService.addToCart(this.room);
      this.isBooked = true;

      Swal.fire({
        icon: 'success',
        title: 'Успіх!',
        text: `Кімната "${this.room.name}" додана до корзини!`,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      this.router.navigate(['/cart']);
    }
  }
}
