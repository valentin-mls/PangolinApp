import { Component, OnInit } from '@angular/core';
import { PangolinService } from '../pangolin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  pangolin: any = {};

  constructor(private pangolinService: PangolinService) {}

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

  updateRole(): void {
    this.pangolinService
      .updateRole(this.pangolin._id, this.pangolin.role)
      .subscribe(
        (response) => console.log(response),
        (error) => console.error(error)
      );
  }
}
