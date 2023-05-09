import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { TeamListContainerComponent } from './team-list-container/team-list-container.component';
import { MaterialModule } from './material/material.module';

import { SignUpFormComponent } from './auth/sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './auth/sign-in-form/sign-in-form.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamExpansionPanelComponent } from './team-expansion-panel/team-expansion-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TeamListContainerComponent,
    SignUpFormComponent,
    SignInFormComponent,
    TeamExpansionPanelComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [CookieService], 
  bootstrap: [AppComponent]


})
export class AppModule {}
