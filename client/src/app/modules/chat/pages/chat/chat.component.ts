import { AuthService } from './../../../../services/auth.service';
import { IUser, IMessage } from './../../interfaces';
import { Observable, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  userInfo$!: Observable<IUser>
  ws: WebSocket = new WebSocket('ws://localhost:5000/ws')
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
    const id = this.router.url.split('/')[2]
    this.userInfo$ = this.http.get<IUser>('http://localhost:5000/api/user/' + id)
    this.authService.getUserInfo()
    .pipe(
      take(1)
    )
    .subscribe({
      next: data => {
        this.myID = data.id
        this.ws.onopen = () => {
          this.ws.send(JSON.stringify({
            method: 'connection',
            recipientID: +this.userID,
            senderID: this.myID,
          }))
        }
      }
    })
    
    
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

  goToUserInfo() {
    this.router.navigate(['/userinfo/', this.userID])
  }

  goBack() {
    this.location.back()
  }

  sendMessage() {
    this.ws.send(JSON.stringify({
      method: 'message',
      message: this.message,
      recipientID: +this.userID,
      senderID: this.myID,
      date: new Date().toISOString(),
    }))
    this.message = ''
  }

  show() {
    console.log(this.messagesArray)
  }
}
