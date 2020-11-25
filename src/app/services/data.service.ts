import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Customer } from '../models/customer';
import { Province } from '../models/province';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) {
    //
  }

  public getCustomers(): Observable<Customer[]> {
    return this.http.get('/api/customers')
      .pipe(
        map(customers => customers as Customer[])
      );
  }

  public postFirstCustomer(customer): Observable<any> {
    const data = {
      firstcustomer: btoa(JSON.stringify(customer)),
      timestamp: new Date().toISOString()
    };

    const headers = {
      'x-client-id': '12345'
    }
    
    return this.http.post('/api/customer', data, { headers });
  }

  public getProvinces(): Observable<Province[]> {
    return this.http.get('/fake-api/provinces')
      .pipe(
        map(provinces => provinces as Province[])
      );
  }
}
