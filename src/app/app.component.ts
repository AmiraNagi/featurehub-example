import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Hello World</h1>
    <nav>
      <ul>
        <li><a routerLink="/company" routerLinkActive="active">Company</a></li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {

}
