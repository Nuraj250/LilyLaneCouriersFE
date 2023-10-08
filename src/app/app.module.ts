import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './component/landing/landing.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { JwtInterceptor, ErrorInterceptor } from './common/helpers';
import { UserService } from './common/service/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ValidationMessageComponent } from './common/util/validation-message/validation-message.component';

export function initializeApp(userService: UserService): any {
  return (): Promise<void> => userService.loadUserData();
}
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignInComponent,
    DashboardComponent,
    ValidationMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatInputModule,
    MatDialogModule


  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [UserService], multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
