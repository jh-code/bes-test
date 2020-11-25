import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

import { Customer } from './models/customer';
import { Province } from './models/province';
import { DataService } from './services/data.service';
import { CustomerModalComponent } from './components/customer-modal/customer-modal.component';
import { ApiErrorService } from './services/api-error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('modal', { static: false }) modal: NgbModal;
  @ViewChild('apiErrorAlert', { static: false }) apiErrorAlert: NgbAlert;

  private errorSub: Subscription;

  public customers: Customer[] = [];
  public provinces: Province[] = [];
  public apiError: HttpErrorResponse;
  public apiErrorClosed = true;

  public get customerData() {
    return this.customers.map(customer => {
      const province = this.provinces.find(province => province.abbreviation === customer.location);
      const [first_name, last_name] = customer.name.split(' ');
      const { id, active } = customer;

      return {
        id,
        active,
        first_name,
        last_name,
        location_abbr: province.abbreviation,
        location_name: province.name
      };
    });
  }

  constructor(
    private dataService: DataService,
    private modalService: NgbModal,
    private apiErrorService: ApiErrorService
  ) {
    //
  }

  public ngOnInit(): void {
    const provinces$ = this.dataService.getProvinces();
    const customers$ = this.dataService.getCustomers()
      .pipe(
        tap(customers => {
          const firstCustomer = customers.find(customer => customer !== undefined);

          this.dataService.postFirstCustomer(firstCustomer)
            .subscribe(() => console.log('Posted first customer to API'));
        })
      );

    forkJoin(provinces$, customers$).subscribe(result => {
      const [provinces, customers] = result;

      this.provinces = provinces;
      this.customers = customers;
    });

    this.errorSub = this.apiErrorService.error.subscribe((error: HttpErrorResponse) => {
      this.apiError = error;
      this.apiErrorClosed = false;

      setTimeout(() => {
        this.apiErrorClosed = true;
      }, 5000);
    });
  }

  public clickCustomer(customer: any): void {
    const modalRef = this.modalService.open(CustomerModalComponent);

    modalRef.componentInstance.customer = customer;
  }

  public ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
}
