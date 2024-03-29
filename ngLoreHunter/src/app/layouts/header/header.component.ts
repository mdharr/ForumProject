import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SideNavService } from 'src/app/services/side-nav.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { HomeService } from 'src/app/services/home.service';
import { Category } from 'src/app/models/category';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { ViewportScroller } from '@angular/common';
import { ScrollService } from 'src/app/services/scroll.service';
import { NotificationDialogComponent } from 'src/app/shared/components/notification-dialog/notification-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserNotificationService } from 'src/app/services/user-notification.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = "Dashboard";

  @ViewChild('mainContainer') mainContainer!: ElementRef;

  loggedInUser: User = new User();

  categories: Category[] = [];

  displayProgressBar: boolean = false;

  isRotated1: boolean = false;

  isRotated2: boolean = false;

  quickJumpText: string = 'Quick Jump';

  private categoriesSubscription: Subscription | undefined;
  private loggedInUserSubscription: Subscription | undefined;

  constructor(private sideNavService: SideNavService,
    private userService: UserService,
    private categoryService: CategoryService,
    private homeService: HomeService,
    private authService: AuthService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private viewportScroller: ViewportScroller,
    private scrollService: ScrollService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private userNotificationService: UserNotificationService,
    ) {

  }

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.authService.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  ngOnInit(): void {

    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
    if (this.loggedInUserSubscription) {
      this.loggedInUserSubscription.unsubscribe();
    }

    this.authService.getCurrentLoggedInUser().subscribe((user: User) => {
      this.loggedInUser = user;
      // Do something with the logged-in user object, e.g. update UI
    });

    this.authService.getLoggedInUser().subscribe({
      next: (user) => {
        this.loggedInUser = user;
      },
      error: (error) => {
        console.log('Error getting loggedInUser');
        console.log(error);
      },
    });

    this.loggedInUserSubscription = this.authService.getLoggedInUser().pipe(
      tap(user => {
        this.loggedInUser = user;
      })
    ).subscribe({
      error: (error) => {
        console.log('Error getting loggedInUser Profile Component');
        console.log(error);
      },
    });
    this.reload();

    this.scrollService.scrollEvent$.subscribe(() => {
      // Scroll to the top or bottom of the page
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
      // Or
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); // Scroll to bottom
    });
  }


  reload(): void {
    this.categoriesSubscription = this.homeService.index().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error:(fail) => {
        console.error('Error getting categories:');
        console.error(fail);
      }
    });

    }

  clickMenu() {
    this.sideNavService.toggle();
    this.displayProgressBar = true;
    setTimeout(() => {
      this.displayProgressBar = false;
    }, 1130);
    if (!this.isRotated2) {
      this.rotateHamburgerRight();
    } else {
      this.resetHamburgerRotationState();
    }
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

  // checkForLogin() {
  //   this.cdr.markForCheck();
  //   this.cdr.detectChanges();
  // }

  getCurrentTimestamp(): number {
    // Logic to get current timestamp
    return Math.floor(Date.now() / 1000);
  }

  rotateChevronTop() {
    this.isRotated1 = !this.isRotated1;

  }

  resetRotationState() {
    console.log('reset rotation state function called');

    this.isRotated1 = false;
  }

  rotateHamburgerRight() {
    this.isRotated2 = !this.isRotated2;

  }

  resetHamburgerRotationState() {
    console.log('reset hamburger rotation state function called');

    this.isRotated2 = false;
  }

  menuOpen(){
    console.log("open")
  }
  menuClose(event:any){
    //event is undefined if you click outside
    if (event)
         console.log("click inside the menu")
      else
         console.log("click outside the menu")
  }

  scrollToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  scrollToBottom(): void {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    this.viewportScroller.scrollToPosition([0, documentHeight - windowHeight]);
  }

  openNotificationDialog(): void {
    const dialogRef = this.dialog.open(NotificationDialogComponent, {
      width: '400px',
      data: {
        userNotification: {
          message: '' // Provide the initial message value here
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the submitted message here, e.g., call the notification service
        this.userNotificationService.sendNotification(result).subscribe({
          next: () => {
            // Handle success
            console.log('Notification sent successfully');
          },
          error: (error) => {
            // Handle error
            console.log('Error sending notification:', error);
          }
        });
      }
    });
  }

}
