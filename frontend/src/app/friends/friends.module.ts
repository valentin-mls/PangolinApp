import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FriendsComponent } from './friends.component';

@NgModule({
  declarations: [FriendsComponent],
  imports: [CommonModule, FormsModule],
})
export class FriendsModule {}
