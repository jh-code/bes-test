import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiBaseUrl = 'https://ballistictest.azurewebsites.net/api';

  constructor(
    private http: HttpClient
  ) {
    this.getCustomers()
      .subscribe(res => console.log(res));
  }

  private getCustomers(): Observable<any> {
    return this.http.get(this.apiBaseUrl + '/customers');
  }
}
