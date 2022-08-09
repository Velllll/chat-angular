import { AuthService } from './../../../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable, take, tap } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup
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
  }

  login() {
    this.http.post<{message?: string, token?: string}>('http://localhost:5000/api/login', this.loginForm.value)
    .pipe(
      tap(r => {
        if(!(r.message)) {
          this.authService.setToken(r.token!)
          this.router.navigate(['/chats']) 
        } else {
          this.loginErr = true
        }
      }),
      take(1),
    )
    .subscribe()
  }
}
