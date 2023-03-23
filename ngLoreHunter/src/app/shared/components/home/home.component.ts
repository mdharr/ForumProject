import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { AuthService } from 'src/app/services/auth.service';
import { HomeService } from 'src/app/services/home.service';
import { PostService } from 'src/app/services/post.service';
import { HostListener } from '@angular/core';
import { PostDataSource } from './../../../services/post.dataSource';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  categoryId: number = 0;
  posts: Post[] = [];
  data: any;
  sort: any;
  latest: Post = new Post();

  isRotated1: boolean = false;
  isRotated2: boolean = false;

  dataSource = new PostDataSource(this.postService);

  constructor(
              private auth: AuthService,
              private homeServ: HomeService,
              private postService: PostService
              ) {}

  ngOnInit() {
    this.reload();
  }

  reload(): void {
    this.homeServ.index().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error:(fail) => {
        console.error('Error getting categories:');
        console.error(fail);
      }
    });
    this.postService.indexAll().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error:(fail) => {
        console.error('Error getting posts:');
        console.error(fail);
      }
    });
  }

  checkLogin(): void {
    this.auth.getLoggedInUser().subscribe({
      next: (user) => {
        console.log(user);
      },
      error:(fail) => {
        console.error('Error getting user:');
        console.error(fail);

      }
    });
  }

  rotateChevronTop() {
    if(this.isRotated1) {
      this.isRotated1 = false;
    } else {
      this.isRotated1 = true;
    }

  }

  rotateChevronBottom() {
    if(this.isRotated2) {
      this.isRotated2 = false;
    } else {
      this.isRotated2 = true;
    }

  }

  hasNetwork(online: boolean) {
    console.log(online);
  }

  @HostListener('window:online', ['$event'])
    onLine(e:any){
    // do something
  }

  // getLatestPost(categoryId: number) {
  //   this.data = this.dataSource.loadLatestPost(categoryId);
  //   this.posts = this.data;
  //   this.latest = this.posts.sort((a, b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
  // }

}
