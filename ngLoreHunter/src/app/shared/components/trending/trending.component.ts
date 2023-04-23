import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

const TRENDING_THRESHOLD = 50;
const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {

  loggedInUser: User = new User();

  trendingPosts$: Observable<Post[]> | undefined;

  constructor(private http: HttpClient, private postService: PostService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getCurrentLoggedInUser().subscribe((user: User) => {
      this.loggedInUser = user;
      // Do something with the logged-in user object, e.g. update UI
    });

    this.trendingPosts$ = this.getTrendingPosts();

  }

  getTrendingPosts(): Observable<Post[]> {
    const oneWeekAgo: number = Date.now() - ONE_WEEK_IN_MS;
      return this.postService.getAllPosts().pipe(
      map(posts => {
        return posts.filter(post => {
          const timeSinceLastEdited = Date.now() - new Date(post.lastEdited).getTime();
          return timeSinceLastEdited <= ONE_WEEK_IN_MS && Date.parse(post.lastEdited) >= oneWeekAgo && post.comments.length >= TRENDING_THRESHOLD;
        });
      })
    );
  }
}
