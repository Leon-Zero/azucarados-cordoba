import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { isDevMode, inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      let message = 'Ocurrió un error inesperado';

      switch (error.status) {
        case 0: message = 'Servidor no disponible'; break;
        case 400: message = 'Solicitud inválida'; break;
        case 401: message = 'No autorizado'; break;
        case 403: message = 'Prohibido'; break;
        case 404: message = 'Recurso no encontrado'; break;
        case 409: message = 'Conflicto en la solicitud'; break;
        case 500: message = 'Error interno del servidor'; break;
        default:
          if (error.status >= 500) message = 'Error del servidor';
      }

      // Mostrar popup
      toast.error(message);

      // consola solo en desarrollo
      if (isDevMode()) {
        console.error('HTTP ERROR INTERCEPTOR:', {
          url: req.url,
          status: error.status,
          message
        });
      }

      return throwError(() => ({ ...error, friendlyMessage: message }));
    })
  );
};
