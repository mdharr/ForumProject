import { Component, OnInit } from '@angular/core';
import { SideNavService } from 'src/app/services/side-nav.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title: string = "Dashboard";

  constructor(private sideNavService: SideNavService,
    private authService: AuthService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router) {

  }

  clickMenu() {
    this.sideNavService.toggle();
  }

  public isCollapsed = false;

  isHomeRoute() {
    return this.router.url === '/';
  }

  loggedIn(): boolean {
    return this.authService.checkLogin();
  }

  closeResult: string = '';

  /**
   * Write code on Method
   *
   * @return response()
   */
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
