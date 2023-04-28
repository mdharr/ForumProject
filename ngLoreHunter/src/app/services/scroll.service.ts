import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private scrollSubject = new Subject<void>();

  scrollEvent$ = this.scrollSubject.asObservable();

  constructor(private viewportScroller: ViewportScroller) {}

  scrollToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  scrollToBottom(): void {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    this.viewportScroller.scrollToPosition([0, documentHeight - windowHeight]);
  }

}
