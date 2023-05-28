import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-games-library',
  templateUrl: './games-library.component.html',
  styleUrls: ['./games-library.component.css']
})
export class GamesLibraryComponent implements OnInit {
  games$!: Observable<Game[]>;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.games$ = this.gameService.fetchGames();
  }

}
