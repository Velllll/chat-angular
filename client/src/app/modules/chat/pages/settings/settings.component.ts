import { Observable } from 'rxjs';
import { AuthService } from './../../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interfaces';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  userInfo$!: Observable<IUser[]>

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userInfo$ = this.http.get<IUser[]>('http://localhost:5000/api/profileinfo', {
      headers: {"Authtorization": "Bearer " + this.authService.getToken()}
    })
  }

  logout() {
    this.authService.logout()
  }
}
