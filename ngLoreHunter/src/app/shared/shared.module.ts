import { TimeAgoPipe } from './../pipes/time-ago.pipe';
import { ScrollService } from 'src/app/services/scroll.service';
import { FilterPipe } from './../pipes/filter.pipe';
import { SortPipe } from './../pipes/sort.pipe';
import { PostDataSource } from './../services/post.dataSource';
import { PostService } from 'src/app/services/post.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';
import { LogoutComponent } from './components/logout/logout.component';
import { PostsComponent } from './components/posts/posts.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommentService } from '../services/comment.service';
import { CommentDataSource } from '../services/comment.dataSource';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileComponent } from './components/profile/profile.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { NoSanitizePipe } from '../utilities/nosanitizerpipe';
import { AuthService } from '../services/auth.service';
import { GamesComponent } from './components/games/games.component';
import { JumpToPageDialogComponent } from './components/jump-to-page-dialog/jump-to-page-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { UserBannerImageDialogComponent } from './components/user-banner-image-dialog/user-banner-image-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { TrendingComponent } from './components/trending/trending.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotificationDialogComponent } from './components/notification-dialog/notification-dialog.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { UserCommentsComponent } from './components/user-comments/user-comments.component';
import { TruncateTextDirective } from '../directives/truncate-text.directive';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { TicketMessagesComponent } from './components/ticket-messages/ticket-messages.component';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';
import { MatOptionModule } from '@angular/material/core';
import { CreateTicketDialogComponent } from './components/create-ticket-dialog/create-ticket-dialog.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserTicketsComponent } from './components/user-tickets/user-tickets.component';
import { UserTicketMessagesComponent } from './components/user-ticket-messages/user-ticket-messages.component';
import { UserFollowersComponent } from './components/user-followers/user-followers.component';

@NgModule({
  declarations: [
    HomeComponent,
    NotFoundComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    LogoutComponent,
    PostsComponent,
    CommentsComponent,
    ProgressBarComponent,
    ProfileComponent,
    PostsListComponent,
    NoSanitizePipe,
    SortPipe,
    FilterPipe,
    GamesComponent,
    JumpToPageDialogComponent,
    UserBannerImageDialogComponent,
    TrendingComponent,
    NotificationDialogComponent,
    UserPostsComponent,
    UserCommentsComponent,
    TruncateTextDirective,
    AdminDashboardComponent,
    TicketListComponent,
    UserListComponent,
    PostListComponent,
    CommentListComponent,
    TicketMessagesComponent,
    TicketDetailsComponent,
    CreateTicketDialogComponent,
    UserDetailsComponent,
    UserTicketsComponent,
    UserTicketMessagesComponent,
    TimeAgoPipe,
    UserFollowersComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    AppRoutingModule,
    MatProgressBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CKEditorModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatOptionModule,
  ],
  exports: [
    HomeComponent,
    NotFoundComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    LogoutComponent,
    ProgressBarComponent,
    CommentsComponent,
    PostsComponent,
    PostsListComponent
  ],
  providers: [
    PostService,
    PostDataSource,
    CommentService,
    CommentDataSource,
    AuthService,
    ScrollService
  ]
})
export class SharedModule { }
