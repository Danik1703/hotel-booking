import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit, AfterViewInit {
  room: any;

  rooms = [
    {
      id: 1,
      name: 'Затишна квартира в центрі',
      description: 'Простора квартира з чудовим краєвидом.',
      price: 800,
      image: 'assets/rooms/lux.jpg',
      lat: 49.8419,
      lng: 24.0315,
      reviews: [
        { author: 'Іван', text: 'Дуже сподобалося! Чисто і затишно.' },
        { author: 'Оля', text: 'Все чудово, приїдемо ще!' }
      ]
    },
    {
      id: 2,
      name: 'Стандартна кімната',
      description: 'Зручна кімната для двох.',
      price: 500,
      image: 'assets/rooms/standard.jpg',
      lat: 50.4501,
      lng: 30.5234,
      reviews: [
        { author: 'Марія', text: 'Комфортно і недорого.' }
      ]
    },
    {
      id: 3,
      name: 'Економ',
      description: 'Простий варіант для бюджетного проживання.',
      price: 300,
      image: 'assets/rooms/econom.jpg',
      lat: 48.3794,
      lng: 31.1656,
      reviews: []
    }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.room = this.rooms.find(r => r.id === id);
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
      iconUrl: 'assets/marker-icon.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    L.marker([this.room.lat, this.room.lng], { icon: customIcon }).addTo(map)
      .bindPopup(this.room.name)
      .openPopup();
  }
}