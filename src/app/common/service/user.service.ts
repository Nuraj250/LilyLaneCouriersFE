import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { HttpMethod } from '../enum/http-method.enum';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _currentUserSubject:any= BehaviorSubject<User>;
  public currentUser:any= Observable<User>

  constructor(
    protected httpService: HttpService,
    private router: Router,
    private http: HttpClient
    ) {
  }
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

  createUser(user: User): Observable<any> {
    return this.http.post(environment.apiUrl + '/api/couriers/auth/signin/customer/save', user);
  }



}
