import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Book } from '../../../interface/book';
import { BooksService } from '../../../service/books.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    TableModule,
    ButtonModule
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  books: Book[] = [];

  constructor(
    private booksService: BooksService
  ) {
  }

  ngOnInit() {
    this.booksService.getAllBooks().subscribe(booksData => this.books = booksData);
  }
}
