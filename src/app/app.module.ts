import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { TeamListContainerComponent } from './team-list-container/team-list-container.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, TeamListContainerComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
