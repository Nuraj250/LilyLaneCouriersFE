import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }

  /**
   * Error interceptor for check user authorized or not
   *
   * @param request Http Requests
   * @param next Http handler
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.authenticationService.logout();
      }
      let error = err.error.message || err.statusText;
      if (err.error.message === 'Invalid token' || err.statusText === 'Unauthorized') {
        error = 'Logged Out';
      }
      return throwError(error);
    }));
  }
}
