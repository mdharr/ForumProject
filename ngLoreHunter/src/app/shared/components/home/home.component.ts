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

  constructor(private auth: AuthService, private homeServ: HomeService) {}

  ngOnInit() {
    // tempTestDeleteMeLater();
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
    })
  }



  // tempTestDeleteMeLater() {
  //   this.auth.login('admin','wombat1').subscribe({
  //     next: (data) => {
  //       console.log('Logged in:');
  //       console.log(data);
  //     },
  //     error: (fail) => {
  //       console.error('Error authenticating:');
  //       console.error(fail);
  //     }
  //   });
  // }

}
