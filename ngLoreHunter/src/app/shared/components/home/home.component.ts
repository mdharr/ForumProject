import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { AuthService } from 'src/app/services/auth.service';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];

  chevron: HTMLElement | any = document.getElementById('up-arrow');

  public isRotated: boolean = false;

  constructor(private auth: AuthService, private homeServ: HomeService) {}

  ngOnInit() {
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

  checkLogin(): void {
    this.auth.getLoggedInUser().subscribe({
      next: (user) => {
        console.log(user);
      },
      error:(fail) => {
        console.error('Error getting user:');
        console.error(fail);

      }
    });
  }

  rotateChevron() {
    if(this.isRotated) {
      this.isRotated = true;
    } else {
      this.isRotated = false;
    }

  }

}
