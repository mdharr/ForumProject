import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.tempTestDeleteMeLater(); // DELETE LATER!!!
  }

  tempTestDeleteMeLater() {
    this.auth.login('admin', 'wombat1').subscribe({
      next: (data) => {
        console.log('Logged in:')
        console.log(data);
      },
      error: (fail) => {
        console.error('Error authenticating:')
        console.error(fail);
      }
    });
  }

}
