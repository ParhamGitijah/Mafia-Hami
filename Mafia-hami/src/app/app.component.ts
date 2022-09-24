import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Mafia-hami';
  faUserCheck = faUserCheck;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('fa');
    translate.use('fa');
  }
}
