import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'bes-test';

  constructor(
    private dataService: DataService
  ) {
    //
  }

  public ngOnInit(): void {
    //
  }
}
