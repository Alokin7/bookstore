import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { User } from '../../interface/user';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    RouterLink,
    RouterOutlet,
    ButtonModule,
    ToastModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';

  loading: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private primeMessageService: MessageService
  ) { }

  isDisabled() {
    if (this.email === '' || this.password === '' || this.firstName === '' || this.lastName === '') {
      return true
    }

    return false;
  }

  resetFields() {
    this.email = '';
    this.password = '';
    this.firstName = '';
    this.lastName = '';
  }

  submit() {
    this.loading = true;

    const userInfo: User = {
      roleId: 2,
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName
    }

    this.authenticationService.registerUser(userInfo).subscribe(response => {
      sessionStorage.setItem('user-token', response.data.token);

      setTimeout(() => {
        this.primeMessageService.add({ severity: 'success', summary: 'Account Created', detail: 'You can now login' });
        this.resetFields();
        this.loading = false;
      }, 1000);
    });
  }
}
