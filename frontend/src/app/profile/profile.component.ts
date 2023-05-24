import { Component, OnInit } from '@angular/core';
import { PangolinService } from '../pangolin.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  pangolin: any = {};
  newFriend: any = {}; // New object for the form

  constructor(
    private pangolinService: PangolinService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('id');
    console.log('ID:', id);
    if (id) {
      this.pangolinService.getProfile(id).subscribe(
        (response: any) => {
          console.log('Profile Response:', response);
          this.pangolin = response;
        },
        (error) => {
          console.error('Profile Error:', error);
        }
      );
    } else {
      console.log('ID not found');
    }
  }

  register(): void {
    this.pangolinService.register(this.newFriend).subscribe(
      (response: any) => {
        const newUserId = response._id;
        const currentUserId = localStorage.getItem('id');
        if (currentUserId) {
          this.pangolinService.addFriend(currentUserId, newUserId).subscribe(
            (response) => {
              console.log(response);
              this.router
                .navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate(['/profile']);
                });
            },
            (error) => console.error(error)
          );
        } else {
          console.log('erreur');
        }
      },
      (error) => console.error(error)
    );
  }

  updateRole(): void {
    this.pangolinService
      .updateRole(this.pangolin._id, this.pangolin.role)
      .subscribe(
        (response) => console.log(response),
        (error) => console.error(error)
      );
  }
}
