import { Component, OnInit } from '@angular/core';
import { PangolinService } from '../pangolin.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent implements OnInit {
  pangolins: any[] = [];

  constructor(private pangolinService: PangolinService) {}

  ngOnInit(): void {
    this.pangolinService.getAllPangolins().subscribe(
      (response) => (this.pangolins = response),
      (error) => console.error(error)
    );
  }

  addFriend(id: string): void {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.pangolinService.addFriend(userId, id).subscribe(
        (response) => console.log(response),
        (error) => console.error(error)
      );
    } else {
      console.log('erreur');
    }
  }

  removeFriend(id: string): void {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.pangolinService.removeFriend(userId, id).subscribe(
        (response) => console.log(response),
        (error) => console.error(error)
      );
    } else {
      console.log('erreur');
    }
  }
}
