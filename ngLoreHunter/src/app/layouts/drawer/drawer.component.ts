import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SideNavService } from 'src/app/services/side-nav.service';
import { ImageService } from 'src/app/services/image.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { HomeService } from 'src/app/services/home.service';
import { AuthService } from 'src/app/services/auth.service';
import { ThemePalette } from '@angular/material/core';
import { Renderer2, ElementRef } from '@angular/core';
import { User } from 'src/app/models/user';
import { Subscription, tap } from 'rxjs';


@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav | undefined;

  loggedInUser: User = new User();

  color: ThemePalette = 'primary';
  checked = false;
  disabled = false;

  categories: Category[] = [];

  hideImages = false;

  private loggedInUserSubscription: Subscription | undefined;

  defaultImageUrl = "https://www.resetera.com/styles/resetera/images/resetera-default-avatar-transparent.png";

  constructor(
              private sideNavService: SideNavService,
              private homeServ: HomeService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              public imageService: ImageService,
              private renderer: Renderer2,
              private el: ElementRef,
              ) {
  }

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.authService.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  ngOnInit() {

    if (this.loggedInUserSubscription) {
      this.loggedInUserSubscription.unsubscribe();
    }

    this.authService.getCurrentLoggedInUser().subscribe((user: User) => {
      this.loggedInUser = user;
      // Do something with the logged-in user object, e.g. update UI
    });

    this.authService.getLoggedInUser().subscribe({
      next: (user) => {
        this.loggedInUser = user;
      },
      error: (error) => {
        console.log('Error getting loggedInUser');
        console.log(error);
      },
    });

    this.loggedInUserSubscription = this.authService.getLoggedInUser().pipe(
      tap(user => {
        this.loggedInUser = user;
      })
    ).subscribe({
      error: (error) => {
        console.log('Error getting loggedInUser Profile Component');
        console.log(error);
      },
    });

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

  loggedIn(): boolean {
    return this.authService.checkLogin();
  }

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }

  toggleHideImages() {
    if(this.imageService.hideImages) {
      this.imageService.hideImages = false;
      console.log('images hidden');
    } else {
      this.imageService.hideImages = true;
      console.log('images unhidden');
    }

  }

  onHideImagesButtonClick() {
    // Get all elements with class "user-avatar" in the component
    const elements = this.el.nativeElement.querySelectorAll('.user-avatar');

    // Loop through each element
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      // Check if the element has the data-original-background-image attribute
      const originalBackgroundImage = element.getAttribute('data-original-background-image');
      if (!originalBackgroundImage) {
        // If the data-original-background-image attribute doesn't exist, store the original background image
        element.setAttribute('data-original-background-image', element.style.backgroundImage);
      }

      // Update the background-image style of the element based on hideImages value
      if (!this.hideImages) {
        element.style.backgroundImage = `url(${this.defaultImageUrl})`;
      } else {
        element.style.backgroundImage = originalBackgroundImage || '';
      }
    }

    // Update the hideImages value
    this.hideImages = !this.hideImages;
  }



}
