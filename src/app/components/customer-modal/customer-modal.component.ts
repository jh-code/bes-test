import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.scss']
})
export class CustomerModalComponent {
  @Input() customer: Customer;

  constructor(
    public activeModal: NgbActiveModal
  ) {
    //
  }
}
