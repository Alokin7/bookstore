import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  url = "http://localhost:777";

  registerUser(userInfo: User) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post<any>(`${this.url}/signup`, userInfo, { headers });
  }

  loginUser(loginData: any) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post<any>(`${this.url}/login`, loginData, { headers });
  }

  access(token: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
      
    return this.http.get<any>(`${this.url}/accessResource`, { headers });
  }
}
