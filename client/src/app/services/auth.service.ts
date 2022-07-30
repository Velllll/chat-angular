import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  setToken(token: string) {
    localStorage.setItem('access_token', token)
  }

  getToken() {
    return localStorage.getItem('access_token')
  }

  isLogin() {
    return this.http.get<any>('http://localhost:5000/api/islogin', {
      headers: {"Authorization": "Bearer " + this.getToken()}
    })
    .pipe(
      map(r => !!r.email)
    )
  }

  getUserInfo() {
    return this.http.get<any>('http://localhost:5000/api/islogin', {
      headers: {"Authorization": "Bearer " + this.getToken()}
    })
  }

  logout() {
    localStorage.removeItem('access_token')
    this.router.navigate(['/login'])
  }

}
