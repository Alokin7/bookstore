import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';

import { AutoCompleteCompleteEvent, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { BooksService } from './service/books.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    MenubarModule,
    FormsModule,
    AutoCompleteModule,
    ButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'bookstore';
  items: MenuItem[] = [];

  selected: any;
  filteredBooks: any[] = [];
  logedUser: boolean = false;

  constructor(
    private booksService: BooksService,
    private router: Router
  ) { }

  ngOnInit() {

    this.items = [
      {
        label: 'Login',
        routerLink: ['/']
      },
      {
        label: 'Books',
        routerLink: ['/books']
      },
      {
        label: 'Admin',
        items: [
          {
            label: 'Create Book',
            routerLink: ['/admin-book-create']
          },
          {
            label: 'All books',
            routerLink: ['/admin-panel'],
          }
        ]
      },
      {
        label: 'No Page',
        routerLink: ['/no-page']
      }
    ];

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }


  logout() {
    sessionStorage.removeItem('user-token');
    this.router.navigate(['/']);
    this.logedUser = false;
  }

  filterBooks(event: AutoCompleteCompleteEvent) {
    const query = event.query
    this.booksService.searchExistingBook(query).subscribe(booksData => this.filteredBooks = booksData);
  }

  selectedBook(event: AutoCompleteSelectEvent) {
    const bookId = event.value.id;
    this.router.navigate([`/book-details/${bookId}`]);
  }
}
