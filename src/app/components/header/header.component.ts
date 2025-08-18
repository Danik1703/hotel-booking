import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cart: any[] = [];
  user: any = null;
  isCartOpen = false;
  cartSub!: Subscription;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    this.user = storedUser ? JSON.parse(storedUser) : null;

    this.cartSub = this.bookingService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price, 0);
  }

  clearCart() {
    this.bookingService.clearCart();
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

    this.isCartOpen = false; 
  }
}
