import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

import { AuthenticationService } from '../../service/authentication.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    PasswordModule,
    RouterLink,
    RouterOutlet,
    FormsModule,
    ToastModule,
    ButtonModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  email: string = '';
  password: string = '';

  loading: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private primeMessageService: MessageService,
    private router: Router
  ) { }

  isDisabled() {
    if (this.email === '' || this.password === '') {
      return true
    }

    return false;
  }

  resetFields() {
    this.email = '';
    this.password = '';
  }

  login() {
    this.loading = true;

    const loginData = {
      email: this.email,
      password: this.password
    };

    this.authenticationService.loginUser(loginData).subscribe({
      next: response => {
        sessionStorage.setItem('user-token', response.data.token);
        this.primeMessageService.add({ severity: 'success', summary: 'Login Successful', detail: 'Gates of books are opening!' });
        this.resetFields();

        setTimeout(() => {
          this.loading = false;
          this.router.navigate(['/books']);
        }, 1000);
      },
      error: errorResponse => {
        if (errorResponse.status === 403) {
          setTimeout(() => {
            this.primeMessageService.add({ severity: 'error', summary: 'Error with data', detail: errorResponse.error.message });
            this.resetFields();
            this.loading = false;
          }, 1000);
        }
      }
    });
  }
}
