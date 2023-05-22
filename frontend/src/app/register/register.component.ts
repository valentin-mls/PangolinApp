import { Component, OnInit } from '@angular/core';
import { PangolinService } from '../pangolin.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  pangolin = { username: '', password: '' };

  constructor(private pangolinService: PangolinService) {}

  ngOnInit(): void {}

  register(): void {
    this.pangolinService.register(this.pangolin).subscribe(
      (response) => console.log(response),
      (error) => console.error(error)
    );
  }
}
