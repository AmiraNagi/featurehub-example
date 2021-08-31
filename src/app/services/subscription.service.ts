import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'

@Injectable()
export class SubscriptionService {
  private subscriptions: Subscription[] = []

  constructor() {}

  public add(sub: Subscription): void {
    this.subscriptions.push(sub)
  }

  public destroy(): void {
    this.subscriptions.forEach((sub) => {
      if (sub) {
        sub.unsubscribe()
      }
    })
    this.subscriptions = []
  }
}
