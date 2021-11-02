import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/FirebaseTSAuth';

import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/FirebaseTSFirestore';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FanAttic';
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  isLoggedIn = false;
  userHasProfile = true;
  private static userDocument: UserDocument;

  constructor(private loginSheet: MatBottomSheet, private router: Router) {
    this.auth.listenToSignInStateChanges((user) => {
      this.auth.checkSignInState({
        whenSignedIn: (user) => {
          this.isLoggedIn = true;
        },

        whenSignedOut: (user) => {
          AppComponent.userDocument = null;
        },

        whenSignedInAndEmailNotVerified: (user) => {
          this.router.navigate(['emailVerification']);
        },

        whenSignedInAndEmailVerified: (user) => {
          this.getUserProfile();
        },

        whenChanged: (user) => {},
      });
    });
  }
  public static getUserDocument() {
    return AppComponent.userDocument;
  }

  getUserName() {
    try {
      return AppComponent.userDocument.publicName;
    } catch (error) {
      return "stranger"
      console.log(error);
    }
  }

  getUserProfile() {
    this.firestore.listenToDocument({
      name: 'Getting Document',
      path: ['Users', this.auth.getAuth().currentUser.uid],
      onUpdate: (result) => {
        AppComponent.userDocument = <UserDocument>result.data();
        this.userHasProfile = result.exists;
        AppComponent.userDocument.userId = this.auth.getAuth().currentUser.uid;
        if (this.userHasProfile) {
          this.router.navigate(['postfeed']);
        }
      },
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

export interface UserDocument {
  publicName: string;
  description: string;
  userId: string;
}
