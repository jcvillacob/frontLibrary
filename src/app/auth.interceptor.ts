import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Obtén el token JWT del almacenamiento local (ajusta esto según cómo almacenes el token en tu aplicación)
    const token = localStorage.getItem('token');

    if (token) {
      // Clonar la solicitud y agregar el encabezado de autorización con el token JWT
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });

      // Enviar la solicitud modificada
      return next.handle(authReq);
    }

    // Si no hay token, enviar la solicitud original sin modificar
    return next.handle(req);
  }
}