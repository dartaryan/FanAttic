import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/FirebaseTSAuth';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FanAttic';
  auth = new FirebaseTSAuth();
  isLoggedIn = false;
  constructor(private loginSheet: MatBottomSheet) {
    this.auth.listenToSignInStateChanges((user) => {
      this.auth.checkSignInState({
        whenSignedIn: (user) => {
          alert('logged in');
          this.isLoggedIn = true;
        },

        whenSignedOut: (user) => {
          alert('logged out');
          this.isLoggedIn = false;
        },

        whenSignedInAndEmailNotVerified: (user) => {user.emailVerified},

        whenSignedInAndEmailVerified: (user) => {},

        whenChanged: (user) => {},
      });
    });
  }

  onLogoutClick() {
    this.auth.signOut();
  }
  loggedIn() {
    return this.auth.isSignedIn();
  }

  onLoginClick() {
    this.loginSheet.open(AuthenticatorComponent);
  }
}
