import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent implements OnInit {
  user: any = null;
  bookings: any[] = [];

  constructor(private bookingService: BookingService, private router: Router) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    this.bookings = this.bookingService.getUserBookings(this.user?.id) || [];
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}
