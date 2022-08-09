import { IUsers, IPhotos } from './../../interfaces';
import { Observable, take, tap, switchMap, from, Subscription } from 'rxjs';
import { AuthService } from './../../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  @ViewChild('select') select!: ElementRef<HTMLInputElement>

  userInfo$!: Observable<IUsers[]>
  userPhotos: {fileName: string; filePath: string}[] = []
  photoPos: number = 1
  photos$!: Observable<IPhotos>
  photosSubscription!: Subscription
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userInfo$ = this.http.get<IUsers[]>('http://localhost:5000/api/profileinfo', {
      headers: {"Authorization": "Bearer " + this.authService.getToken()}
    })

    this.photos$ = this.userInfo$
    .pipe(
      take(1),
      switchMap(info => {
        return this.http.get<IPhotos[]>('http://localhost:5000/api/photos/' + info[0].userID)
      }),
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

  logout() {
    this.authService.logout()
  }

  setPhoto() {
    this.select.nativeElement.click()
    this.select.nativeElement.onchange = () => {
      const file: File = this.select.nativeElement.files![0]
      this.sendFile(file)
    }
  }

  sendFile(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    this.http.post('http://localhost:5000/api/setmyphotos', formData, {
      headers: {"Authorization": "Bearer " + this.authService.getToken()}
    })
    .pipe(
      tap((data: any) => this.userPhotos.push(data)),
      take(1),
    )
    .subscribe()
  }


}
