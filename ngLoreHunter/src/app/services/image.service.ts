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

  generateBlurredImagePlaceholder(width: number, height: number, blurAmount: number): string {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      // Unable to create temporary 2D rendering context
      return '';
    }

    // Create a temporary canvas for blurring
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');

    if (!tempCtx) {
      // Unable to create temporary 2D rendering context
      return '';
    }

    // Draw a scaled-down version of the original image onto the temporary canvas
    tempCtx.drawImage(canvas, 0, 0, width, height);

    // Apply blur effect
    for (let i = 0; i < blurAmount; i++) {
      ctx.clearRect(0, 0, width, height);
      ctx.filter = `blur(${(blurAmount - i) / blurAmount}px)`;
      ctx.drawImage(tempCanvas, 0, 0, width, height);
      tempCtx.clearRect(0, 0, width, height);
      tempCtx.drawImage(canvas, 0, 0, width, height);
    }

    // Convert the canvas to a data URL representing the blurred image
    const dataUrl = canvas.toDataURL('image/jpeg');

    return dataUrl;
  }
}
