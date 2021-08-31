import { Component, OnInit } from '@angular/core';
import { FeaturehubService } from '../services/featurehub.service';
import { skip } from 'rxjs/operators';
import { SubscriptionService } from '../services/subscription.service';

@Component({
  selector: 'app-company',
  template: ``,
  styles: []
})
export class CompanyComponent implements OnInit {

  constructor(
    readonly featurehubService: FeaturehubService,
    readonly subscriptionService: SubscriptionService
  ) {
  }

  ngOnInit() {
    this.subscriptionService.add(this.featurehubService
      .isEnabled('FEATURE_ONE')
      .pipe(
        skip(1) // skip first response in case feature not yet in map
      )
      .subscribe(featureOne => {
        console.log('featureOne ' + featureOne)
        if (featureOne) {
          console.log('featureOne is on')
          // this.router.navigate(['f1'])
        } else {
          this.subscriptionService.add(this.featurehubService
            .isEnabled('FEATURE_TWO', 'testone')
            .pipe(
              skip(1) // skip first response in case feature not yet in map
            )
            .subscribe(isSet => {
              console.log('FEATURE_TWO ' + isSet)
              if (isSet) {
                console.log("navigate to v2")
              } else {
                console.log("navigate to v1")
              }
            }))
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscriptionService.destroy()
  }

}

