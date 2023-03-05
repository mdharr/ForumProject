import { Component, OnInit } from '@angular/core';
import { SideNavService } from 'src/app/services/side-nav.service';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title: string = "Dashboard";

  constructor(private sideNavService: SideNavService) {

  }

  clickMenu() {
    this.sideNavService.toggle();
  }

}
