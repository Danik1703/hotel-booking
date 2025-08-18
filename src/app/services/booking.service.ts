import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private cartKey = 'cart';
  private bookingsKey = 'myBookings';

  private cartSubject = new BehaviorSubject<any[]>(this.loadCart());
  cart$ = this.cartSubject.asObservable();

  constructor() { }

  addToCart(room: any) {
    const cart = this.loadCart();
    cart.push(room);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  getCart(): any[] {
    return this.loadCart();
  }

  clearCart() {
    localStorage.removeItem(this.cartKey);
    this.cartSubject.next([]);
  }

  private loadCart(): any[] {
    try {
      const data = localStorage.getItem(this.cartKey);
      const parsed = data ? JSON.parse(data) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Помилка при читанні броней:', e);
      return [];
    }
  }

  confirmBookings(userId: string): any[] {
    const cart = this.loadCart();
    if (cart.length === 0) return [];

    const confirmedBookings = cart.map(room => ({
      ...room,
      userId,
      date: new Date().toISOString()
    }));

    const allBookings = this.getAllBookings();
    allBookings.push(...confirmedBookings);

    localStorage.setItem(this.bookingsKey, JSON.stringify(allBookings));
    this.clearCart();

    return confirmedBookings;
  }

  getAllBookings(): any[] {
    try {
      const data = localStorage.getItem(this.bookingsKey);
      const parsed = data ? JSON.parse(data) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Помилка при читанні корзини:', e);
      return [];
    }
  }

  getUserBookings(userId: string): any[] {
    return this.getAllBookings().filter(b => b.userId === userId);
  }
}
