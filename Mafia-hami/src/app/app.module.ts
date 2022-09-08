import { ReadService } from './read.service';
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


export const firebaseConfig={
  apiKey: "AIzaSyCc4biSDcyMoscTSYU8v9N-5_KZbvxgfd4",
  authDomain: "mafiahami.firebaseapp.com",
  databaseURL: "https://mafiahami-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mafiahami",
  storageBucket: "mafiahami.appspot.com",
  messagingSenderId: "758691212574",
  appId: "1:758691212574:web:f325d0ac8eae5c8f65ad0f"
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
