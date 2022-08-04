import { AuthService } from './../../../../services/auth.service';
import { IUsers } from './../../interfaces';
import { debounceTime, filter, fromEvent, map, Observable, of, switchMap, tap} from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild('search', {static: true}) search!: ElementRef

  users$!: Observable<IUsers[]>
  
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.users$ = fromEvent(this.search.nativeElement, 'keyup')
    .pipe(
      map((event: any) => event.target.value),
      debounceTime(500),
      switchMap(value => {
        if(value === '') return of([])
        return this.http.get<IUsers[]>("http://localhost:5000/api/usersbyemail/" + value)
      })
    )

  }

  openChat(userID: number) {
    this.router.navigate(['/chat', userID])
  }
}
