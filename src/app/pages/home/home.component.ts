import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from 'src/app/tools/authenticator/authenticator.component';
import { LadderComponent } from 'src/app/tools/ladder/ladder.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private loginSheet: MatBottomSheet) {}
  // ladder: LadderComponent = new LadderComponent;
  ngOnInit(): void {}
  onClimbUp() {
    this.loginSheet.open(AuthenticatorComponent);
  }
}
