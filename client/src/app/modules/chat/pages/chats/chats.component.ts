import { Router } from '@angular/router';
import { IUsers } from './../../interfaces';
import { from, map, mergeMap, switchMap, take, tap } from 'rxjs';
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
  users: any
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.users = this.http.get<number[]>('http://localhost:5000/api/mychats', {
        headers: {"Authorization": "Bearer " + this.authService.getToken()}
      })
    .pipe(
      take(1),
      switchMap(arr => {
        return from(arr).pipe(
          map(id => {
            return this.http.get<IUsers>('http://localhost:5000/api/user/' + id)
          })
        )
      }),
      mergeMap(o => o),
      tap(data => this.userInfoArr.push(data))
    )
    .subscribe()
  }

  goToChat(id: number) {
    this.router.navigate(['/chat/', id])
  }

}
