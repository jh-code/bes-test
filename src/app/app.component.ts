import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './models/customer';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  public customers: Customer[] = [];
  public provinces = [];

  constructor(
    private dataService: DataService
  ) {
    //
  }

  public ngOnInit(): void {
    this.dataService.getCustomers()
      .subscribe(customers => this.customers = customers);

    this.dataService.getProvinces()
      .subscribe(provinces => this.provinces = provinces);
  }

  public splitName(customerName: string): string[] {
    return customerName.split(' ');
  }

  public getProvinceName(abbreviation: string): string {
    return this.provinces
      .find(province => province.abbreviation === abbreviation)
  }
}
