import { AuthService } from './../../../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup
  response$?: Observable<{message?: string, token?: string}>
  responseSubscription?: Subscription
  loginErr: boolean = false

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "email": new FormControl('', 
      [Validators.required, Validators.email]
      ),
      "password": new FormControl('', 
      [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]
      )
    })

    console.log(this.authService.isLogin())
  }

  ngOnDestroy(): void {
    this.responseSubscription?.unsubscribe()
  }

  login() {
    this.response$ = this.http.post<{message?: string, token?: string}>('http://localhost:5000/api/login', this.loginForm.value)
    this.responseSubscription = this.response$.subscribe({
      next: r => {
        if(!(r.message)) {
          this.authService.setToken(r.token!)
          this.router.navigate(['/chats']) 
        } else {
          this.loginErr = true
        }
      }
    })
    
  }
}
