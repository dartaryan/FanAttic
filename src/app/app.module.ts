import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from 'src/environments/environment';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/FirebaseTSApp';
import { HomeComponent } from './pages/home/home.component';

import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { StarsComponent } from './tools/stars/stars.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, AuthenticatorComponent, StarsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent,StarsComponent],
})
export class AppModule {
  constructor() {
    FirebaseTSApp.init(environment.firebaseConfig);
  }
}
