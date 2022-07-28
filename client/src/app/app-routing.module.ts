import { AppComponent } from './app.component';
import { ChatGuard } from './guards/chat.guard';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    canActivate: [ChatGuard],
    canDeactivate: [ChatGuard],
    path: '', 
    loadChildren: () => import('./modules/chat/chat.module').then(m => m.ChatModule),
  },
  
  { canActivate: [AuthGuard],
    canDeactivate: [AuthGuard],
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
