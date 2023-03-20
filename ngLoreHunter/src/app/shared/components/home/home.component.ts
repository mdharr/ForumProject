import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { AuthService } from 'src/app/services/auth.service';
import { HomeService } from 'src/app/services/home.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];

  isRotated1: boolean = false;
  isRotated2: boolean = false;

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

  rotateChevronTop() {
    if(this.isRotated1) {
      this.isRotated1 = false;
    } else {
      this.isRotated1 = true;
    }

  }

  rotateChevronBottom() {
    if(this.isRotated2) {
      this.isRotated2 = false;
    } else {
      this.isRotated2 = true;
    }

  }

  hasNetwork(online: boolean) {
    console.log(online);
  }

  @HostListener('window:online', ['$event'])
    onLine(e:any){
    // do something
  }

}
