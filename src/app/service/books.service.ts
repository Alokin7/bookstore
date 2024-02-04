import { Injectable } from '@angular/core';
import { Book } from '../interface/book'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private http: HttpClient
  ) { }

  url = 'http://localhost:7777/books';

  getAllBooks() {
    return this.http.get<Book[]>(this.url);
  }

  getAllExistingBooks() {
    return this.http.get<Book[]>(`${this.url}?deleted_like=false`);
  }

  getBookById(id: number) {
    return this.http.get<Book>(`${this.url}/${id}`);
  }

  putBookData(book: Book) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.put(`${this.url}/${book.id}`, book, { headers });
  }

  postBookData(book: Book) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post(`${this.url}`, book, { headers });
  }

  searchAllBook(text: string) {
    const trimedText = text.trim();
    return this.http.get<Book[]>(`${this.url}?q=${trimedText}`);
  }

  searchExistingBook(text: string) {
    const trimedText = text.trim();
    return this.http.get<Book[]>(`${this.url}?q=${trimedText}&deleted_like=false`);
  }
}
