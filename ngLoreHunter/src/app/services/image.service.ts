import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private _hideImages: boolean = false;

  constructor() { }

  get hideImages(): boolean {
    return this._hideImages;
  }

  set hideImages(value: boolean) {
    this._hideImages = value;
  }
}
