import { AppRoutingModule } from './../app-routing.module';
import { AppModule } from './../app.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerComponent } from './drawer/drawer.component';
import { HeaderComponent } from './header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutsComponent } from './layouts.component';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ScrollService } from '../services/scroll.service';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    DrawerComponent,
    HeaderComponent,
    LayoutsComponent,
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
    MatButtonModule,
    MatListModule,
    RouterModule,
    MatExpansionModule,
    SharedModule,
    AppRoutingModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  exports: [
    HeaderComponent,
    DrawerComponent,
    LayoutsComponent
  ],
  providers: [
    ScrollService
  ]
})
export class LayoutsModule { }
