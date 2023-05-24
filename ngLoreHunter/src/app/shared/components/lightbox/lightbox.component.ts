import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.css']
})
export class LightboxComponent {

  @Input() imageSource: string = '';
  @Input() showLightbox: boolean = false;
  @Output() closeLightbox = new EventEmitter<void>();

}
