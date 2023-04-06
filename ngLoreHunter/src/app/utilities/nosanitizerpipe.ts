import { Pipe, PipeTransform, Renderer2, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'noSanitize' })
export class NoSanitizePipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer, private renderer: Renderer2, private el: ElementRef) { }

  transform(html: any): SafeHtml {
    // Create a new div element
    const tempDiv = this.renderer.createElement('div');
    tempDiv.innerHTML = html;

    // Find all blockquote elements within the HTML content
    const blockquotes = tempDiv.querySelectorAll('blockquote');

    // Apply styles to each blockquote element
    blockquotes.forEach((blockquote: any) => {
      this.renderer.addClass(blockquote, 'message-body');
      this.renderer.setStyle(blockquote, 'margin', '0.5em 0');
      this.renderer.setStyle(blockquote, 'background', '#f9fafa');
      this.renderer.setStyle(blockquote, 'border', '2px solid #e0e0e0');
      this.renderer.setStyle(blockquote, 'border-left', '3px solid #3f51b5');
      this.renderer.setStyle(blockquote, 'padding-left', '10px');
      this.renderer.setStyle(blockquote, 'padding-top', '10px');
      this.renderer.setStyle(blockquote, 'padding-bottom', '0');
    });

    // Find all oembed elements within the HTML content
    const oembeds = tempDiv.querySelectorAll('oembed');

    // Replace oembed elements with YouTube iframe markup
    oembeds.forEach((oembed: any) => {
      const youtubeUrl = oembed.getAttribute('url');
      if (youtubeUrl) {
        const iframe = this.renderer.createElement('iframe');
        this.renderer.setAttribute(iframe, 'src', youtubeUrl.replace('/watch?v=', '/embed/'));
        this.renderer.setStyle(iframe, 'width', '100%');
        this.renderer.setStyle(iframe, 'height', '400px');
        this.renderer.setStyle(iframe, 'border', 'none');
        this.renderer.insertBefore(oembed.parentNode, iframe, oembed);
        this.renderer.removeChild(oembed.parentNode, oembed);
      }
    });

    // Return the sanitized HTML content as SafeHtml
    return this.domSanitizer.bypassSecurityTrustHtml(tempDiv.innerHTML);
  }

}

