import { Router } from '@angular/router';
import { IChats, IUser, IUsers } from './../../interfaces';
import { map, pipe, take, tap } from 'rxjs';
import { AuthService } from './../../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  userInfoArr: IUsers[] = []

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.http.get<IChats[]>('http://localhost:5000/api/mychats', {
        headers: {"Authorization": "Bearer " + this.authService.getToken()}
      })
    .pipe(
      take(1)
    )
    .subscribe({
      next: d => {
        d.forEach(id => {
          this.http.get<IUsers>('http://localhost:5000/api/user/' + id)
          .pipe(
            take(1)
          )
          .subscribe({
            next: userInfo => this.userInfoArr.push(userInfo)
          })
        })
      }
    })
  }


  goToChat(id: number) {
    this.router.navigate(['/chat/', id])
  }

}
