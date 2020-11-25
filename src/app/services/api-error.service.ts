import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiErrorService {
  private errorSubject: Subject<HttpErrorResponse> = new Subject();

  public error: Observable<HttpErrorResponse> = this.errorSubject.asObservable();

  constructor() {
    //
  }

  public newError(error: HttpErrorResponse): void {
    this.errorSubject.next(error);
  }
}
