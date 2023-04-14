import { Component, Input, OnInit } from '@angular/core';
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

  clickedCard: Element | null = null; // Global variable to keep track of clicked card

  private subscription: Subscription = new Subscription();

  constructor(private gameService: GameService) { }

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

  onCardClick(event: Event) {
    // // Get the clicked element
    // const clickedElement = event.target as HTMLElement;

    // // Check if the clicked element has the "item-card" class
    // if (clickedElement.classList.contains('item-card')) {
    //   // Remove the "card-clicked" class from any previously clicked item-card
    //   const previouslyClickedElement = document.querySelector('.item-card.card-clicked');
    //   if (previouslyClickedElement) {
    //     previouslyClickedElement.classList.remove('card-clicked');
    //   }

    //   // Add the "card-clicked" class to the clicked item-card
    //   clickedElement.classList.add('card-clicked');

    //   // Center the clicked item-card in the window
    //   const cardRect = clickedElement.getBoundingClientRect();
    //   const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    //   const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    //   const cardLeft = (windowWidth - cardRect.width) / 2;
    //   const cardTop = (windowHeight - cardRect.height) / 2;
    //   clickedElement.style.left = cardLeft + 'px';
    //   clickedElement.style.top = cardTop + 'px';

    //   // Add a click event listener to the document to detect clicks outside of the item-card
    //   document.addEventListener('click', (event) => {
    //     const target = event.target as HTMLElement;
    //     // Check if the clicked element is not a child of an item-card
    //     if (!target.closest('.item-card')) {
    //       // Remove the "card-clicked" class from the clicked item-card
    //       clickedElement.classList.remove('card-clicked');
    //     }
    //   });
    // }
  }

}
