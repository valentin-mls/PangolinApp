import { Component, OnInit } from '@angular/core';
import { PangolinService } from '../pangolin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  pangolin = { username: '', password: '' };

  constructor(
    private pangolinService: PangolinService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(): void {
    console.log('Pangolin to login:', this.pangolin);

    this.pangolinService.login(this.pangolin).subscribe(
      (response: any) => {
        console.log('Received response:', response);

        localStorage.setItem('token', response.token);
        localStorage.setItem('id', response.pangolin._id);
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.log('Error occurred:', error);
      }
    );
  }
}
