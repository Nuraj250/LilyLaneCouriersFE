import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from 'src/app/component/sign-in/sign-in.component';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  constructor(public dialog: MatDialog) {}

  showPrompt(): void {
    const dialogRef = this.dialog.open(SignInComponent, {
      width: '34vw', 
      height: '89vh',
      // Adjust the width as needed
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle any actions after the dialog is closed
    });
  }
  }