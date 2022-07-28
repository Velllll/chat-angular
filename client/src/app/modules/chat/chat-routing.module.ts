import { UserInfoComponent } from './pages/user-info/user-info.component';
import { MainComponent } from './pages/main/main.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UsersComponent } from './pages/users/users.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: MainComponent, 
    children: [
      {path: 'chats', component: ChatsComponent},
      {path: 'chat/:id', component: ChatComponent},
      {path: 'users', component: UsersComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'userinfo/:id', component: UserInfoComponent}
    ]
  }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
