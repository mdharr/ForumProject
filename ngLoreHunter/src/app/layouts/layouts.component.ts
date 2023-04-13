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

  }

}
