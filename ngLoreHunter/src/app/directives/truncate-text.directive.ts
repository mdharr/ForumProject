import { Directive, ElementRef, Renderer2, OnInit, Input, HostListener, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appTruncateText]'
})
export class TruncateTextDirective implements OnInit, AfterViewInit {
  @Input('appTruncateText') maxWidth: number = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.truncateText();
  }

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.truncateText();
  }

  private truncateText() {
    const element = this.el.nativeElement;
    const text = element.innerText;
    const context = element.getContext('2d');
    context.font = window.getComputedStyle(element).getPropertyValue('font');
    let width = context.measureText(text).width;

    if (width > this.maxWidth) {
      let truncatedText = text;
      while (width > this.maxWidth && truncatedText.length > 0) {
        truncatedText = truncatedText.slice(0, -1);
        width = context.measureText(truncatedText + '...').width;
      }
      element.innerText = truncatedText + '...';
    }
  }

  ngAfterViewInit(): void {
    // get the text content of the element
    const text = this.el.nativeElement.textContent.trim();
    // get the computed style for the element
    const computedStyle = window.getComputedStyle(this.el.nativeElement);
    // get the width of the element
    const width = parseFloat(computedStyle.width);
    // set the max character limit based on the width of the element
    let maxChars = 30;
    if (width >= 500) {
      maxChars = 60;
    } else if (width >= 400) {
      maxChars = 50;
    } else if (width >= 300) {
      maxChars = 40;
    }
    // use the maxWidth input property if it is provided
    if (this.maxWidth) {
      maxChars = Math.floor(this.maxWidth / this.getAverageCharWidth());
    }
    // check if the text length is greater than the max character limit
    if (text.length > maxChars) {
      // truncate the text and add ellipsis
      this.el.nativeElement.textContent = text.slice(0, maxChars) + '...';
    }
  }

  private getAverageCharWidth(): number {
    // create a temporary element to calculate the average character width
    const temp = document.createElement('div');
    temp.style.fontSize = '16px';
    temp.style.position = 'absolute';
    temp.style.left = '-9999px';
    temp.style.visibility = 'hidden';
    temp.textContent = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    document.body.appendChild(temp);
    const width = temp.offsetWidth / 62;
    document.body.removeChild(temp);

    return width;
  }
}


