import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Observable, first } from "rxjs";
import { HttpMethod } from "../enum/http-method.enum";

@Injectable({
    providedIn: 'root'
  })
  export class HttpService {
    constructor(
      private http: HttpClient
    ) {
    }
  
    public sendHttp<T>(path: string, method: HttpMethod, body?: any, responseType?: any): Observable<T> {
      return new Observable<T>((observer) => {
        const options = {body, responseType};
        this.http.request<T>(method, path, options).pipe(first()).subscribe({
            next: (value) => observer.next(value),
            error: (value) => observer.error(value)
        })
      });
    }
  
  }
  