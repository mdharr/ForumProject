import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  public sideNavToggleSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }


  public toggle() {
    return this.sideNavToggleSubject.next(null);
  }
}
