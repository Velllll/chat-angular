import { Observable } from 'rxjs';
import { IUser } from './../../interfaces';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userInfo$!: Observable<IUser>

  constructor(
    private router: Router,
    private http: HttpClient,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.router.url.split('/')[2]
    this.userInfo$ = this.http.get<IUser>('http://localhost:5000/api/user/' + id)
  }

  goBack() {
    this.location.back()
  }
}
