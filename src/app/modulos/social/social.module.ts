import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialRoutingModule } from './social-routing.module';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatars';


@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    SocialRoutingModule,
    FormsModule,
    AvatarModule,
  ]
})
export class SocialModule { }
