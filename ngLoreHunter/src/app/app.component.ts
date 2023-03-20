import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngLoreHunter';

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit() {
    // if(!navigator.onLine) {
    //   alert('please check your internet connection');
    // }
    addEventListener('offline', (e) => {
      this._snackBar.open('Please check your internet connection','Dismiss', {
        duration: 5000
      });
    });

    addEventListener('online', (e) => {
      this._snackBar.open('You are now online','Dismiss', {
        duration: 2000
      });
    });
  }
}
