import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbAlertModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { CustomerModalComponent } from './components/customer-modal/customer-modal.component';
import { ApiErrorService } from './services/api-error.service';
import { ApiErrorInterceptor } from './http-interceptors/api-error.interceptor'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    CustomerModalComponent
  ],
  entryComponents: [
    CustomerModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModalModule,
    NgbAlertModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    })
  ],
  providers: [
    DataService,
    ApiErrorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
