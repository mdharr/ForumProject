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



@NgModule({
  declarations: [
    DrawerComponent,
    HeaderComponent,
    LayoutsComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule
  ],
  exports: [
    HeaderComponent,
    DrawerComponent,
    LayoutsComponent
  ]
})
export class LayoutsModule { }
