import { Component, OnChanges, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SideNavService } from 'src/app/services/side-nav.service';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { Category } from 'src/app/models/category';
import { HomeService } from 'src/app/services/home.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav | undefined;

  categories: Category[] = [];

  constructor(private sideNavService: SideNavService, private homeServ: HomeService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.sideNavService.sideNavToggleSubject.subscribe(()=> {
      this.sidenav?.toggle();
    });
    this.reload();
  }

  reload(): void {
    this.homeServ.index().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error:(fail) => {
        console.error('Error getting categories:');
        console.error(fail);
      }
    });
  }

}
