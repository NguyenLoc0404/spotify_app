import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { MusicService } from "./music-service.service";
@Injectable({
  providedIn: 'root',
})

export class AuthInterceptorService implements HttpInterceptor {
  constructor(private router: Router,private http: HttpClient) { }
  private musicService = new MusicService(this.http);
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(      
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            window.location.href = this.musicService.generateNewToken();
          }
        }
        console.log('err',err)
        return throwError(err);
      })
    );
  }
}