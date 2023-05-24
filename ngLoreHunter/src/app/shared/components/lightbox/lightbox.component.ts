import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.css']
})
export class LightboxComponent {

  @Input() imageSource: string = '';
  showLightbox: boolean = false;

  openLightbox() {
    this.showLightbox = true;
  }

  closeLightbox() {
    this.showLightbox = false;
  }

}
