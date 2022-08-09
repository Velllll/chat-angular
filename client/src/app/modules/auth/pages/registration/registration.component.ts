import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscription, take, tap } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  regForm!: FormGroup
  userExistErr = false

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.regForm = new FormGroup({
      "email": new FormControl('', 
      [Validators.required, Validators.email]
      ),
      "name": new FormControl('', 
      [Validators.required]
      ),
      "password": new FormControl('', 
      [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]
      )
    })
  }

  reg() {
    this.http.post<{message: string}>('http://localhost:5000/api/registration', this.regForm.value)
    .pipe(
      tap({
        next: r => {
          if(!(r.message === "Duplicate")) {
            this.router.navigate(['/login']) 
          } else {
            this.userExistErr = true
          }
        }
      }),
      take(1),
    )
    .subscribe()
  }
}
