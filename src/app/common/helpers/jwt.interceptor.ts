import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { UserService } from '../service/user.service';
import { environment } from '../../environment/environment';



const user: any = localStorage.getItem('user');

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {
  }

  /**
   * JWT interceptor for set jwt token in every http request header
   *
   * @param request Http Requests
   * @param next Http handler
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url

    const isLoggedIn = this.userService.currentUserValue;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
      const t: any = JSON.parse(user).token;
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${t}`
        }
      });
    }

    return next.handle(request);
  }
}
