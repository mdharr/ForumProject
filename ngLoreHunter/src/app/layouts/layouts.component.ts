import { Component, OnInit, Input } from '@angular/core';
import { DrawerComponent } from './drawer/drawer.component';
import { MatNavList } from '@angular/material/list';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
