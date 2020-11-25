import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiErrorService } from '../services/api-error.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  constructor(
    private apiErrorService: ApiErrorService
  ) {
    //
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse): Observable<never> => {
          this.apiErrorService.newError(error);
          return throwError(error);
        })
      );
  }
}
