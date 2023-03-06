import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SideNavService } from 'src/app/services/side-nav.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav | undefined;

  constructor(private sideNavService: SideNavService) {

  }

  ngOnInit() {
    this.sideNavService.sideNavToggleSubject.subscribe(()=> {
      this.sidenav?.toggle();
    });
  }

}
