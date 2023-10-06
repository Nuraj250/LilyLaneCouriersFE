import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './common/components/dashboard/dashboard.component';
import { SignInComponent } from './common/components/sign-in/sign-in.component';
import { authGuard } from './common/helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
    data: {title: 'DASHBOARD'}
  },
  {
    path: 'login',
    component: SignInComponent,
    data: {register: true, title: 'LOGIN'}
  },

  // otherwise redirect to home.
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
