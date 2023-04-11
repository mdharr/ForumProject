import { Component, OnInit, Input } from '@angular/core';
import { DrawerComponent } from './drawer/drawer.component';
import { MatNavList } from '@angular/material/list';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent implements OnInit {

  loggedInUser: User = new User();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getLoggedInUser().subscribe({
      next: (user) => {
        this.loggedInUser = user;
        console.log(user);
      },
      error: (error) => {
        console.log('Error getting loggedInUser');
        console.log(error);
      },
    });

  }

}
