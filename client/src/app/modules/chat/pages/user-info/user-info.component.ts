import { Observable, switchMap, take, tap, Subscription, from } from 'rxjs';
import { IUser, IPhotos } from './../../interfaces';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy {

  userInfo$!: Observable<IUser>
  userPhotos: {fileName: string; filePath: string}[] = []
  photos$!: Observable<IPhotos>
  photosSubscription!: Subscription
  constructor(
    private router: Router,
    private http: HttpClient,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.router.url.split('/')[2]
    this.userInfo$ = this.http.get<IUser>('http://localhost:5000/api/user/' + id)
    
    this.photos$ = this.http.get<IPhotos[]>('http://localhost:5000/api/photos/' + id)
    .pipe(
      take(1),
      switchMap(arr => {
        return from(arr)
      }),
      tap((info: IPhotos) => {
        const name = info.photoPath.split('/')[3].split(".")[0]
        this.userPhotos.push({fileName: name, filePath: info.photoPath})
      })
    )
    this.photosSubscription = this.photos$.subscribe()
  }

  ngOnDestroy(): void {
    this.photosSubscription.unsubscribe()
  }

  goBack() {
    this.location.back()
  }
}
