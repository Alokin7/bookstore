import { Component } from '@angular/core';
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
import { KeyFilterModule } from 'primeng/keyfilter';

@Component({
  selector: 'app-admin-book-create',
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
    InputGroupModule,
    KeyFilterModule
  ],
  templateUrl: './admin-book-create.component.html',
  styleUrl: './admin-book-create.component.css'
})
export class AdminBookCreateComponent {
  loading: boolean = false;

  bookId: number = 0;
  title: string = '';
  author: string = '';
  description: string = '';
  cover: string = '';
  deleted: boolean = false;
  price: number = 0;
  category: string = '';

  constructor(
    private booksService: BooksService
  ) { }

  saveBookData() {
    const book: Book = {
      id: this.bookId,
      title: this.title,
      author: this.author,
      description: this.description,
      cover: this.cover,
      deleted: this.deleted,
      price: this.price,
      category: this.category
    }
    // this.book.id = this.bookId;
    // this.book.title = this.title;
    // this.book.author = this.author;
    // this.book.description = this.description;
    // this.book.cover = this.cover;
    // this.book.deleted = this.deleted;
    // this.book.price = this.price;
    // this.book.category = this.category;

    console.log(book)

    this.loading = true;

    this.booksService.postBookData(book).subscribe(() => {
      setTimeout(() => {
        this.loading = false;

        this.bookId = 0;
        this.title = '';
        this.author = '';
        this.description = '';
        this.cover = '';
        this.deleted = false;
        this.price = 0;
        this.category = '';
      }, 1000);
    });
  }
}
