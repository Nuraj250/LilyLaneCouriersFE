import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';
import { User } from './common/model/user.model';
import { UserService } from './common/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, OnDestroy{
  [x: string]: any;
  public headerTitle?: string;
  currentUser?: User;
  private routerDataSubscription?: Subscription;

  constructor(
    private router: Router,
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.userService.currentUser.subscribe((user: User ) => {
    //   this.currentUser = user;
    //   this.changeDetectorRef.detectChanges();

    //   if (!this.userService.currentUserValue){
    //     this.router.navigate(['/landing']);
    //   }
    // });
    // this.initiateTitleUpdating();
  }

  // private initiateTitleUpdating() {
  //   this.routerDataSubscription = this.router
  //     .events.pipe(
  //       filter(event => event instanceof NavigationEnd),
  //       map(() => {
  //         let child = this.activatedRoute.firstChild;
  //         while (child?.firstChild) {
  //           child = child.firstChild;
  //         }
  //         if (child?.snapshot.data['title']) {
  //           return child.snapshot.data['title'];
  //         }
  //         // provide a default value if required
  //       })
  //     ).subscribe((title: string) => {
  //       this.headerTitle = title;
  //     });
  // }

  ngOnDestroy() {
    // if (this.routerDataSubscription) {
    //   this.routerDataSubscription.unsubscribe();
    // }
  }
}
