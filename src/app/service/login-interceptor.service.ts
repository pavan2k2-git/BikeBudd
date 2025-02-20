import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, tap, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

/*
export function LoggingInterceptor (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  
  const token = localStorage.getItem('mytoken');

  if(token){
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}`}
    });
    console.log("Added header using Interceptor");
  }
  else{
    console.log("No token Found");
  }
  return next(req); 
};
*/

@Injectable()

export class LoginInterceptor implements HttpInterceptor {

  #authService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     
    const token = this.#authService.getToken(); 
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}`}
    });
     return next.handle(req);
  };
}

