import { AuthService } from './../../../../services/auth.service';
import { IUsers } from './../../interfaces';
import { Observable, take, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$!: Observable<IUsers[]>
  myID: number = 5

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getUserInfo()
    .pipe(
      take(1)
    )
    .subscribe({
      next: data => {
        this.myID = data.id
        this.users$ = this.http.get<IUsers[]>('http://localhost:5000/api/users/' + this.myID)
      }
    })

    
  }

  openChat(userID: number) {
    this.router.navigate(['/chat', userID])
  }
}
