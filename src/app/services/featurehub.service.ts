import { Injectable } from '@angular/core'
import {
  EdgeFeatureHubConfig,
  Readyness,
} from 'featurehub-javascript-client-sdk'
import { Observable, BehaviorSubject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class FeaturehubService {
  private featureMap: {
    [key: string]: BehaviorSubject<boolean>
  } = {}

  constructor() { }

  public isEnabled(feature: string, companyName?): Observable<boolean> {
    if (!(feature in this.featureMap)) {
      this.featureMap[feature] = new BehaviorSubject(false)
      this.callFeatureHub(feature, companyName)
    }
    return this.featureMap[feature]
  }

  private async callFeatureHub(feature: string, companyName?) {
    let initialized = false
    const fhConfig = new EdgeFeatureHubConfig("featurehubUrl", "featurehubApiKey").init() //ADD YOUR KEY HERE
    let failCounter = 0
    console.log("companyName is " + companyName);
    const fhClient = await fhConfig.newContext().attribute_value('companyName', companyName).build()

    fhConfig.addReadynessListener(async (ready) => {
      console.log("readyness listener state " + ready + " for feature " + feature);
      if (!initialized && ready == Readyness.Ready) {
        console.log("fhClient.isEnabled(feature)  " + fhClient.isEnabled(feature) + " for feature " + feature);
        this.featureMap[feature].next(fhClient.isEnabled(feature))
        initialized = true
      } else if (ready === Readyness.Failed && failCounter > 3) {
        fhConfig.close()
        initialized = false
      } else if (ready === Readyness.Failed) {
        failCounter++
        this.featureMap[feature].next(false)
      } else {
        failCounter = 0
      }
    })
  }
}

