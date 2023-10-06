import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { authGuard } from './common/helpers/auth.guard';
import { LandingComponent } from './component/landing/landing.component';

const routes: Routes = [
  {
    path: 'home',
    component: LandingComponent,
    data: { title: 'DASHBOARD' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    data: { title: 'DASHBOARD' }
  },
  {
    path: 'login',
    component: SignInComponent,
    data: { title: 'LOGIN' }
  },

  // otherwise redirect to home.
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
