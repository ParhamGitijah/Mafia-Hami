import { MafiaPipe } from './pipes/mafia-pipe';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { SlideOutComponent } from './components/slide-out/night/slide-out.component';
import { NewGameComponent } from './forms/new-game/new-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InitDashboardComponent } from './components/init-dashboard/init-dashboard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NightComponent } from './components/night/night.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlayerDashboardComponent } from './components/player-dashboard/player-dashboard.component';
import { SunComponent } from './sun/sun.component';
import { CirtyPipe } from './pipes/city-pipe';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NightraportComponent } from './components/slide-out/night-raport/nightraport/nightraport.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';



export const firebaseConfig = {
  apiKey: 'AIzaSyCc4biSDcyMoscTSYU8v9N-5_KZbvxgfd4',
  authDomain: 'mafiahami.firebaseapp.com',
  databaseURL:
    'https://mafiahami-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'mafiahami',
  storageBucket: 'mafiahami.appspot.com',
  messagingSenderId: '758691212574',
  appId: '1:758691212574:web:f325d0ac8eae5c8f65ad0f',
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SlideOutComponent,
    NewGameComponent,
    InitDashboardComponent,
    DashboardComponent,
    NightComponent,
    PlayerDashboardComponent,
    SunComponent,
    MafiaPipe,
    CirtyPipe,
    NightraportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserModule,

    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgbModule,
    ConfirmationPopoverModule.forRoot({
      focusButton: 'confirm',
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
