import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawerComponent } from './layouts/drawer/drawer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './shared/components/home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { PostsComponent } from './shared/components/posts/posts.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { UserComponent } from './shared/components/user/user.component';
import { CommentsComponent } from './shared/components/comments/comments.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { PostsListComponent } from './shared/components/posts-list/posts-list.component';
import { LogoutComponent } from './shared/components/logout/logout.component';
import { GamesComponent } from './shared/components/games/games.component';
import { TrendingComponent } from './shared/components/trending/trending.component';
import { UserPostsComponent } from './shared/components/user-posts/user-posts.component';
import { UserCommentsComponent } from './shared/components/user-comments/user-comments.component';
import { AdminDashboardComponent } from './shared/components/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'layouts', component: LayoutsComponent },
  { path: 'categories/:categoryId/posts', component: PostsComponent},
  { path: 'posts', component: PostsListComponent },
  { path: 'trending', component: TrendingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'games', component: GamesComponent },
  { path: 'user', component: UserComponent },
  { path: 'users/:userId', component: ProfileComponent },
  { path: 'users/:userId/posts', component: UserPostsComponent },
  { path: 'users/:userId/comments', component: UserCommentsComponent },
  { path: 'comments', component: CommentsComponent },
  { path: 'categories/:categoryId/posts/:postId/comments', component: CommentsComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'drawer', component: DrawerComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: '**', component: NotFoundComponent } //page not found route
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
