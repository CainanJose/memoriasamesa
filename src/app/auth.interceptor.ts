import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const AuthInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    const agora = Date.now();

    if (exp < agora) {
      alert('Sua sessão expirou. Faça login novamente.');
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      router.navigate(['/login']);
      return throwError(() => new Error('Token expirado'));
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(request).pipe(
    catchError((err) => {
      if (err.status === 401) {
        alert('Você não está autorizado. Faça login novamente.');
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};
