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
    // this.renderer.setStyle(blockquote, 'background', '#f9fafa');
    // this.renderer.setStyle(blockquote, 'border', '1px solid #e0e0e0');
    // this.renderer.setStyle(blockquote, 'border-left', '2px solid #3f51b5');
    this.renderer.setStyle(blockquote, 'padding-bottom', '0');
    // this.renderer.setStyle(blockquote, 'border-radius', '6px');

  // Find all <p> tags inside the blockquote
  const paragraphs = blockquote.querySelectorAll('p');

  // Wrap the paragraphs after the first one in a <div>
  if (paragraphs.length > 1) {
    const divContentWrapper = this.renderer.createElement('div');
    this.renderer.addClass(divContentWrapper, 'blockquote-content');

    for (let i = 1; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i];
      this.renderer.appendChild(divContentWrapper, paragraph.parentNode.removeChild(paragraph));
    }

    const divUserWrapper = this.renderer.createElement('div');
    this.renderer.addClass(divUserWrapper, 'blockquote-user');
    this.renderer.appendChild(divUserWrapper, paragraphs[0].parentNode.removeChild(paragraphs[0]));

    this.renderer.appendChild(blockquote, divUserWrapper);
    this.renderer.appendChild(blockquote, divContentWrapper);
  }


  });

  const images = tempDiv.querySelectorAll('img');

  // Add the "post-img" class to each <img> element
  images.forEach((image: any) => {
    this.renderer.setStyle(image, 'width', '100%');
    this.renderer.setStyle(image, 'height', 'auto');
    this.renderer.setAttribute(image, 'loading', 'lazy');
  });


    // Find all oembed elements within the HTML content
    const oembeds = tempDiv.querySelectorAll('oembed');

    // Replace oembed elements with YouTube iframe markup
    oembeds.forEach((oembed: any) => {
      const youtubeUrl = oembed.getAttribute('url');
      if (youtubeUrl) {
        const iframe = this.renderer.createElement('iframe');
        this.renderer.setAttribute(iframe, 'src', youtubeUrl.replace('/watch?v=', '/embed/'));
        this.renderer.setStyle(iframe, 'width', '640px');
        this.renderer.setStyle(iframe, 'height', '360px');
        this.renderer.setStyle(iframe, 'border', 'none');

        const container = this.renderer.createElement('div');
        this.renderer.setStyle(container, 'display', 'flex');
        this.renderer.setStyle(container, 'justify-content', 'center');
        this.renderer.appendChild(container, iframe);

        this.renderer.insertBefore(oembed.parentNode, container, oembed);
        this.renderer.removeChild(oembed.parentNode, oembed);
      }
    });


    // Return the sanitized HTML content as SafeHtml
    return this.domSanitizer.bypassSecurityTrustHtml(tempDiv.innerHTML);
  }

}

