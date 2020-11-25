import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from './models/customer';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('content', { static: false }) content;

  public customers: Customer[] = [];
  public provinces = [];
  public selectedCustomer: Customer;

  constructor(
    private dataService: DataService,
    private modalService: NgbModal
  ) {
    //
  }

  public ngOnInit(): void {
    this.dataService.getProvinces()
      .subscribe(provinces => {
        this.provinces = provinces;
        this.dataService.getCustomers()
          .subscribe(customers => this.customers = customers);
      });
  }

  public splitName(customerName: string): string[] {
    return customerName.split(' ');
  }

  public getProvinceName(abbreviation: string): string {
    return this.provinces
      .find(province => province.abbreviation === abbreviation)
  }

  public clickCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
    this.modalService.open(this.content);
  }
}
