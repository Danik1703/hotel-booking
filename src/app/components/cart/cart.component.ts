import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  user: any = null;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    this.user = storedUser ? JSON.parse(storedUser) : null;
    this.cart = this.bookingService.getCart();
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price, 0);
  }

  clearCart() {
    this.bookingService.clearCart();
    this.cart = [];
    Swal.fire('✅ Корзина очищена!', '', 'success');
  }

  checkout() {
    if (!this.user) {
      Swal.fire({
        icon: 'warning',
        title: 'Не авторизовано',
        text: 'Будь ласка, увійдіть, щоб оформити бронювання',
      });
      return;
    }

    if (this.cart.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Корзина порожня',
        text: 'Будь ласка, додайте кімнати для бронювання',
      });
      return;
    }

    const userId = this.user.id ? this.user.id.toString() : this.user.email;

    const confirmedBookings = this.bookingService.confirmBookings(userId);

    Swal.fire({
      icon: 'success',
      title: 'Бронювання оформлено!',
      text: `Ви успішно забронювали ${confirmedBookings.length} кімнат(и).`,
      timer: 2500,
      showConfirmButton: false,
    });

    this.cart = this.bookingService.getCart();
  }
}
