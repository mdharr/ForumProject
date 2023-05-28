import { LoginComponent } from './../login/login.component';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserGame } from 'src/app/models/user-game';
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

  constructor(
    private userGameService: UserGameService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,) {}

  ngOnInit(): void {
    console.log("user id in user games component" + this.userId);

    this.fetchUserGames(this.userId);

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

  filterByCategory(userGames: UserGame[], category: string): Observable<UserGame[]> {
    return of(userGames).pipe(
      map((userGames: UserGame[]) => userGames.filter((userGame: UserGame) => userGame.category === category))
    );
  }

}
