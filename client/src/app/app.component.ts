import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  navigation$!: Observable<boolean>
  navigationSubscription!: Subscription
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.navigation$ = this.authService.isLogin()
    this.navigationSubscription = this.navigation$.subscribe({
      next: value => {
        if(!value) this.router.navigate(['login'])
      }
    })
  }

  ngOnDestroy(): void {
    this.navigationSubscription.unsubscribe()
  }

}
