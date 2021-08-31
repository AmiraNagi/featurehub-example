import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyComponent } from './company/company.component';
import { FeaturehubService } from './services/featurehub.service';
import { SubscriptionService } from './services/subscription.service';

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    SubscriptionService,
    FeaturehubService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
