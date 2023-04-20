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


@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav | undefined;

  color: ThemePalette = 'primary';
  checked = false;
  disabled = false;

  categories: Category[] = [];

  hideImages = false;

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
    // Get all img elements with class "user-avatar" in the component
    const imgElements = this.el.nativeElement.querySelectorAll('img.user-avatar');

    // Loop through each img element
    for (let i = 0; i < imgElements.length; i++) {
      const imgElement = imgElements[i];

      // Check if the img element has the data-original-src attribute
      const originalSrc = imgElement.getAttribute('data-original-src');
      if (!originalSrc) {
        // If the data-original-src attribute doesn't exist, store the original src
        imgElement.setAttribute('data-original-src', imgElement.src);
      }

      // Update the src attribute of the img element based on hideImages value
      if (!this.hideImages) {
        imgElement.src = this.defaultImageUrl;
      } else {
        imgElement.src = originalSrc || '';
      }
    }

    // Update the hideImages value
    this.hideImages = !this.hideImages;
  }

}
