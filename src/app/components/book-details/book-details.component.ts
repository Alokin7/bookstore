import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../service/books.service';
import { Book } from '../../interface/book';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    CommonModule,
    CardModule
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})

export class BookDetailsComponent {
  book: Book | undefined;

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService
  ) {
    const bookId = Number(this.route.snapshot.params['id']);
    this.booksService.getBookById(bookId).subscribe((book) => {
      this.book = book;
    });
  }
}
