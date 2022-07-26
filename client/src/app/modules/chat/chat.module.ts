import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatsComponent } from './pages/chats/chats.component';
import { UsersComponent } from './pages/users/users.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ChatComponent } from './pages/chat/chat.component';
import { MainComponent } from './pages/main/main.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { FormsModule } from '@angular/forms';
import { CaruselComponent } from './components/carusel/carusel.component';

@NgModule({
  declarations: [
    ChatsComponent,
    UsersComponent,
    SettingsComponent,
    ChatComponent,
    MainComponent,
    UserInfoComponent,
    CaruselComponent, 
    SearchFilterPipe
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
  ]
})
export class ChatModule { }
