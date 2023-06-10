import { LoginComponent } from './../login/login.component';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { GameCategory, GameRating, UserGame } from 'src/app/models/user-game';
import { AuthService } from 'src/app/services/auth.service';
import { UserGameService } from 'src/app/services/user-game.service';

@Component({
  selector: 'app-user-games',
  templateUrl: './user-games.component.html',
  styleUrls: ['./user-games.component.css']
})
export class UserGamesComponent implements OnInit {

  @Input() userId: number = 0;

  profileUser: User = new User();
  loggedInUser: User = new User();
  userGamesPlayed$!: Observable<UserGame[]>;
  userGamesPlaying$!: Observable<UserGame[]>;
  gameCategories: GameCategory[] = [];
  ratings: GameRating[] = [];

  constructor(
    private userGameService: UserGameService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,) {}

  ngOnInit(): void {
    console.log("user id in user games component" + this.userId);

    this.fetchUserGames(this.userId);
    this.gameCategories = Object.values(GameCategory);
    this.ratings = Object.values(GameRating);

    this.authService.getCurrentLoggedInUser().subscribe((user: User) => {
      this.loggedInUser = user;
      // Do something with the logged-in user object, e.g. update UI
    });

    this.reload();

    this.authService.getLoggedInUser().subscribe({
      next: (user) => {
        this.loggedInUser = user;
        console.log(user);
      },
      error: (error) => {
        console.log('Error getting loggedInUser');
        console.log(error);
      },
    });
  }

  reload() {

  }

  fetchUserGames(userId: number) {
    this.userGameService.fetchUserGames(userId).subscribe((userGames: UserGame[]) => {
      this.userGamesPlayed$ = this.filterByCategory(userGames, 'PLAYED');
      console.log(this.userGamesPlayed$);

      this.userGamesPlaying$ = this.filterByCategory(userGames, 'PLAYING');
      console.log(this.userGamesPlaying$);

    });
  }

  filterByCategory(userGames: UserGame[], gameCategory: string): Observable<UserGame[]> {
    return of(userGames).pipe(
      map((userGames: UserGame[]) => userGames.filter((userGame: UserGame) => userGame.gameCategory === gameCategory))
    );
  }

  generateStarArray(rating: GameRating): string[] {
    const starArray: string[] = [];

    if (rating === GameRating.ZERO) {
      starArray.push('grey_full', 'grey_full', 'grey_full', 'grey_full', 'grey_full');
    } else if (rating === GameRating.HALF) {
      starArray.push('half', 'grey_full', 'grey_full', 'grey_full', 'grey_full');
    } else if (rating === GameRating.ONE) {
      starArray.push('full', 'grey_full', 'grey_full', 'grey_full', 'grey_full');
    } else if (rating === GameRating.ONE_AND_A_HALF) {
      starArray.push('full', 'half', 'grey_full', 'grey_full', 'grey_full');
    } else if (rating === GameRating.TWO) {
      starArray.push('full', 'full', 'grey_full', 'grey_full', 'grey_full');
    } else if (rating === GameRating.TWO_AND_A_HALF) {
      starArray.push('full', 'full', 'half', 'grey_full', 'grey_full');
    } else if (rating === GameRating.THREE) {
      starArray.push('full', 'full', 'full', 'grey_full', 'grey_full');
    } else if (rating === GameRating.THREE_AND_A_HALF) {
      starArray.push('full', 'full', 'full', 'half', 'grey_full');
    } else if (rating === GameRating.FOUR) {
      starArray.push('full', 'full', 'full', 'full', 'grey_full');
    } else if (rating === GameRating.FOUR_AND_A_HALF) {
      starArray.push('full', 'full', 'full', 'full', 'half');
    } else if (rating === GameRating.FIVE) {
      starArray.push('full', 'full', 'full', 'full', 'full');
    }

    return starArray;
  }

  getStarSymbol(star: string): string {
    if (star === 'full') {
      return '&#9733;'; // Full star Unicode character
    } else if (star === 'half') {
      return '&#189;'; // Half star Unicode character
    } else if (star === 'grey_full') {
      return '&#9733;'
    } else if (star === 'grey_half') {
      return '&#189;'
    } else {
      return ''; // Empty string for any other value (no star)
    }
  }

}
