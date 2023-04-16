import { Component, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: any[] = [];

  cardClicked = false; // Flag to track if the card is clicked
  cardElement: HTMLElement | null = null; // Reference to the card element
  originalTransform: string = '';

  private subscription: Subscription = new Subscription();

  constructor(private gameService: GameService, private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this.subscription = this.gameService.getGames().subscribe({
      next: (response: { results: Game[] }) => { // Update the type of response to { results: Game[] }
        if (Array.isArray(response.results)) { // Check if response.results is an array
          this.games = response.results; // Assign API response to games variable
        } else {
          console.error('Failed to fetch games:', 'Response.results is not an array:', response.results);
        }
      },
      error: error => {
        console.error('Failed to fetch games:', error);
      }
    });
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
    event.stopPropagation();
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

}
