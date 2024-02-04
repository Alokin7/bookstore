import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Book } from '../../interface/book';
import { BooksService } from '../../service/books.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    TableModule,
    ButtonModule
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})

export class BookListComponent {
  books: Book[] = [];

  constructor(
    private booksService: BooksService
  ) {
  }

  ngOnInit() {
    this.booksService.getAllExistingBooks().subscribe(booksData => this.books = booksData);
  }
}
