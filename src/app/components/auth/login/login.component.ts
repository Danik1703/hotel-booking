import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('loggedInUser')) {
      this.router.navigate(['/home']);
    }
  }

  onLogin() {
    const userData = localStorage.getItem('user');
    if (!userData) {
      this.errorMessage = 'Користувач не знайдений. Зареєструйтесь.';
      return;
    }

    const user = JSON.parse(userData);
    if (user.email === this.email && user.password === this.password) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Невірний email або пароль';
    }
  }
}
