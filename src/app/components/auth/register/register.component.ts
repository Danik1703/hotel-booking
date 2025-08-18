import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('loggedInUser')) {
      this.router.navigate(['/home']);
    }
  }

  onRegister() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Паролі не співпадають';
      return;
    }

    const newUser = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));

    this.router.navigate(['/home']);
  }
}
