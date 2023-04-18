import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { JumpToPageDialogComponent } from '../jump-to-page-dialog/jump-to-page-dialog.component';



@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: any[] = [];

  pages: number[] = [];
  page = 1; // Add page variable to track current page
  pageSize = 40; // Add pageSize variable to set page size
  totalPages: number = 0;
  jumpToPageInput: number = 0;
  currentPage: number = 0; // Define currentPage as a number variable



  cardClicked = false; // Flag to track if the card is clicked
  cardElement: HTMLElement | null = null; // Reference to the card element
  originalTransform: string = '';

  private subscription: Subscription = new Subscription();

  constructor(private gameService: GameService, private renderer: Renderer2, private el: ElementRef, private cdr: ChangeDetectorRef, private dialog: MatDialog) { }

  ngOnInit() {
    this.fetchGames(this.page, this.pageSize);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe(); // Unsubscribe from the subscription to avoid memory leaks
    }
  }
  @HostListener('document:click', ['$event'])
  onCardClick(event: MouseEvent) {
    const clickedCardElement = event.currentTarget as HTMLElement;

    // If a card is already clicked, return it to its original position
    if (this.cardElement && this.cardElement !== clickedCardElement) {
      this.cardElement.classList.remove('card-clicked');
      this.cardElement.style.transform = this.originalTransform;
    }

    // Set the current clicked card as the new cardElement
    if (!this.cardElement?.classList.contains('card-clicked')) {
      this.cardElement = clickedCardElement;
      this.originalTransform = this.cardElement.style.transform;
      this.cardElement.classList.add('card-clicked');
    }

  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // If a card is clicked and the click is outside of the card, return the card to its original position
    if (this.cardElement && !this.cardElement.contains(event.target as Node)) {
      this.cardElement.classList.remove('card-clicked');
      this.cardElement.style.transform = this.originalTransform;
      this.cardElement = null;
    }
  }

  @HostListener('document:mouseleave')
  onDocumentMouseLeave(event: MouseEvent) {
    // Reset the position and zoom of the card when the mouse leaves the document
    if (this.cardElement && this.cardElement.classList.contains('card-clicked')) {
      this.cardElement.style.transform = this.originalTransform;
    }
    // event.stopPropagation();
  }

  @HostListener('document:mousemove', ['$event'])
  onDocumentMouseMove(event: MouseEvent) {
    // Update the transform property of the card to tilt it towards the mouse cursor when hovered
    if (this.cardElement && this.cardElement.classList.contains('card-clicked')) {
      const cardRect = this.cardElement.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      const tiltX = ((event.clientX - cardRect.left) - cardRect.width / 2) * 0.05; // Adjust the scaling factor here
      const tiltY = ((event.clientY - cardRect.top) - cardRect.height / 2) * -0.05; // Adjust the scaling factor here
      this.cardElement.style.transform = `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale(1.5)`;
    }
  }

  onPageChange(event: any) {

    this.page = event.pageIndex + 1;
    this.setCurrentPage(this.page); // Call setCurrentPage with updated page value
    this.fetchGames(this.page, this.pageSize); // Call fetchGames with updated page value
    this.changeStyleIfCurrentPage(this.page === this.currentPage); // Call changeStyleIfCurrentPage to update the styles of the cards

  }

  onPreviousPage() {
    if (this.page > 1) { // Check if current page is greater than 1
      this.page -= 1; // Decrement the page value
      this.setCurrentPage(this.page); // Call setCurrentPage with updated page value
      this.fetchGames(this.page, this.pageSize); // Call fetchGames with updated page value
      this.changeStyleIfCurrentPage(this.page === this.currentPage); // Call changeStyleIfCurrentPage to update the styles of the cards

    }
  }

  onNextPage() {
    this.page += 1; // Increment the page value
    this.setCurrentPage(this.page); // Call setCurrentPage with updated page value
    this.fetchGames(this.page, this.pageSize); // Call fetchGames with updated page value
    this.changeStyleIfCurrentPage(this.page === this.currentPage); // Call changeStyleIfCurrentPage to update the styles of the cards

  }

// Jump to a specific page
onJumpToPage(page: number) {
  if (page > 0 && page <= this.totalPages) {
    this.page = page;
    this.setCurrentPage(page); // Call setCurrentPage with updated page value
    this.fetchGames(this.page, this.pageSize);
    this.changeStyleIfCurrentPage(this.page === this.currentPage); // Call changeStyleIfCurrentPage to update the styles of the cards

  }
}

  fetchGames(page: number, pageSize: number) {
    // Call the getGames() method of the gameService with the updated page and pageSize parameters, and subscribe to the response
    this.subscription = this.gameService.getGames(page, pageSize).subscribe({
      next: (response: { results: Game[], count: number }) => { // Update response type to include count field
        if (Array.isArray(response.results)) {
          this.games = response.results;
          this.totalPages = Math.ceil(response.count / pageSize); // Update totalPages variable
          this.pages = this.generatePageNumbers(page, this.totalPages); // Update pages array with generated page numbers
          console.log(this.games);
          this.cdr.detectChanges();
        } else {
          console.error('Failed to fetch games:', 'Response.results is not an array:', response.results);
        }
      },
      error: error => {
        console.error('Failed to fetch games:', error);
      }
    });
  }

  // Generate page numbers based on current page and total pages
generatePageNumbers(currentPage: number, totalPages: number): number[] {
  const pageNumbers: number[] = [];
  const maxVisiblePages = 5; // Maximum number of visible pages in the pagination

  // Add previous button
  pageNumbers.push(1);

  // Add ellipsis if current page is not within the first 3 pages
  if (currentPage > 3) {
    pageNumbers.push(-1);
  }

  // Add visible page numbers
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i > 1 && i < totalPages) {
      pageNumbers.push(i);
    }
  }

  // Add ellipsis if current page is not within the last 3 pages
  if (currentPage < totalPages - 2) {
    pageNumbers.push(-1);
  }

  // Add next button
  pageNumbers.push(totalPages);

  return pageNumbers;
}

  updatePaginationNumber() {
    // Clear the pages array
    this.pages = [];

    // Calculate the start and end page numbers based on the current page
    let startPage: number;
    let endPage: number;
    const totalVisiblePages = 5; // Number of visible pages in the pagination

    if (this.page <= Math.floor(totalVisiblePages / 2) + 1) {
      startPage = 1;
      endPage = Math.min(totalVisiblePages, this.totalPages);
    } else if (this.page >= this.totalPages - Math.floor(totalVisiblePages / 2)) {
      startPage = Math.max(1, this.totalPages - totalVisiblePages + 1);
      endPage = this.totalPages;
    } else {
      startPage = this.page - Math.floor(totalVisiblePages / 2);
      endPage = this.page + Math.floor(totalVisiblePages / 2);
    }

    // Add ellipsis if necessary
    if (startPage > 1) {
      this.pages.push(-1);
    }

    // Add page numbers to the pages array
    for (let i = startPage; i <= endPage; i++) {
      this.pages.push(i);
    }

    // Add ellipsis if necessary
    if (endPage < this.totalPages) {
      this.pages.push(-1);
    }
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  changeStyleIfCurrentPage(currentPage: boolean) {
    if (currentPage) {
      const element = document.getElementById(`page-${this.page}`); // Replace 'yourElementId' with the actual ID of the element you want to change the style of
      if (element) {
        element.style.color = '#8050bf';
        element.style.boxShadow = '0 -2px #8050bf inset';
        element.style.cursor = 'pointer';
      }
    }
  }

  onJumpToPageDialog() {
    console.log('onJumpToPageDialog called');

    const dialogRef = this.dialog.open(JumpToPageDialogComponent, {
      width: '250px',
      data: { currentPage: this.currentPage, totalPages: this.totalPages } // Pass current page and total pages as data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.page) {
        const page = result.page;
        this.onJumpToPage(page); // Call the onJumpToPage method with the selected page number
      }
    });
  }



}
