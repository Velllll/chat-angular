import { AuthService } from './../../../../services/auth.service';
import { IUser, IMessage } from './../../interfaces';
import { Observable, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit, AfterViewChecked {

  userInfo$!: Observable<IUser>
  ws!: WebSocket
  message: string = ''
  userID = this.router.url.split('/')[2]
  myID!: number
  messagesArray: IMessage[] = []

  constructor(
    private router: Router,
    private http: HttpClient,
    private location: Location,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userInfo$ = this.http.get<IUser>('http://localhost:5000/api/user/' + this.userID)

    this.authService.getUserInfo()
    .pipe(
      take(1)
    )
    .subscribe({
      next: data => {
        this.myID = data.id
        this.ws = new WebSocket('ws://localhost:5000/ws')
        this.ws.onopen = () => {
          this.ws.send(JSON.stringify({
            method: 'connection',
            recipientID: +this.userID,
            senderID: this.myID,
          }))
        }
        this.ws.onmessage = (event) => {
          const msg = JSON.parse(event.data)
          console.log(msg)
          if(msg.method !== 'connection') this.messagesArray.push(msg)
        }
        this.ws.onclose = () => {
          console.log('ws close')
        }
        this.ws.onerror = () => {
          console.log('error ws')
        }
      }
    })
    this.http.get<any>('http://localhost:5000/api/messages/' + this.userID, {
      headers: {"Authorization": "Bearer " + this.authService.getToken()}
    })
    .pipe(
      take(1)
    )
    .subscribe({
      next: data => this.messagesArray = [...this.messagesArray, ...data]
    })
  }

  ngAfterViewInit(): void {
    
  }

  ngAfterViewChecked(): void {
    document.querySelector("html")!.scrollTop =  document.querySelector("html")!.scrollHeight
  }

  goToUserInfo() {
    this.router.navigate(['/userinfo/', this.userID])
  }

  goBack() {
    this.location.back()
  }

  sendMessage() {
    if(this.messagesArray.length === 0) {
      console.log('chat created')
      this.ws.send(JSON.stringify({
        method: 'create-chat',
        senderID: this.myID,
        recipientID: +this.userID,
      }))
    }
    this.ws.send(JSON.stringify({
      method: 'message',
      message: this.message,
      recipientID: +this.userID,
      senderID: this.myID,
      date: new Date().toISOString(),
    }))
    this.message = ''
  }

}
