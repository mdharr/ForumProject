import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  userId: number = 0;
  profileUser: User = new User();
  loggedInUser: User = new User();
  userGames$!: Observable<UserGame[]>;

  constructor(
    private userGameService: UserGameService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['userId'];
      console.log(this.userId);

      this.reload();
    });

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
    this.userGames$ = this.userGameService.fetchUserGames(this.userId);
  }

  reload() {

  }

}
