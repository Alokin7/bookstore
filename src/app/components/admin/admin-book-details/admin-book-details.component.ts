import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BooksService } from '../../../service/books.service';
import { Book } from '../../../interface/book';

import { CardModule } from 'primeng/card';
import { SplitterModule } from 'primeng/splitter';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputGroupModule } from 'primeng/inputgroup';


@Component({
  selector: 'app-admin-book-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    SplitterModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule,
    ButtonModule,
    InputTextareaModule,
    InputGroupModule
  ],
  templateUrl: './admin-book-details.component.html',
  styleUrl: './admin-book-details.component.css'
})
export class AdminBookDetailsComponent implements OnInit {
  book!: Book;
  loading: boolean = false;

  bookId!: number;
  title!: string;
  author!: string;
  description!: string;
  cover!: string;
  deleted!: boolean;
  price!: number;
  category!: string;

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService
  ) { }

  ngOnInit() {
    const routeBookId = Number(this.route.snapshot.params['id']);
    this.booksService.getBookById(routeBookId).subscribe((book) => {
      this.book = book;

      this.bookId = book.id;
      this.title = book.title;
      this.author = book.author;
      this.description = book.description;
      this.cover = book.cover;
      this.deleted = book.deleted;
      this.price = book.price;
      this.category = book.category;
    });
  }

  saveBookData() {
    this.book.title = this.title;
    this.book.author = this.author;
    this.book.description = this.description;
    this.book.cover = this.cover;
    this.book.deleted = this.deleted;
    this.book.price = this.price;
    this.book.category = this.category;

    this.loading = true;

    this.booksService.putBookData(this.book).subscribe(() => {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });
  }
}
