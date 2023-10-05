import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
constructor(
  private _currentUserSubject: BehaviorSubject<User>,
  public currentUser: Observable<User>){}

  public loadUserData(): Promise<void> {
    return new Promise<void>((resolve, reject): void => {
      const userJSON :any=localStorage.getItem('user');
      this._currentUserSubject = new BehaviorSubject<User>(JSON.parse(userJSON));
      this.currentUser = this._currentUserSubject.asObservable();
      resolve();
    });
  }

  public get currentUserValue(): User {
    return this._currentUserSubject!.value;
  }

  public get currentUserSubject(): BehaviorSubject<User> {
    return this._currentUserSubject;
  }

}
