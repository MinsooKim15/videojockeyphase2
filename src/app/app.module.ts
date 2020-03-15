import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {MailService} from './mail.service'

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import {MainPartComponent} from './main-part/main-part.component';
import {ReadLetterComponent} from './read-letter/read-letter.component';
import {MakersComponent} from './makers/makers.component';
import {FooterComponent} from './footer/footer.component';
import {ArchiveComponent} from './archive/archive.component';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {NgxPaginationModule} from 'ngx-pagination';

const appRoutes: Routes = [
  { path: 'archive', component: ArchiveComponent  },
  { path: '', component: MainPageComponent },

];
@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule.forRoot(
      appRoutes,
    )
    ],
  declarations: [
    AppComponent,
    MainPartComponent,
    ReadLetterComponent,
    MakersComponent,
    FooterComponent,
    ArchiveComponent,
    MainPageComponent
    ],
  providers : [ MailService,AngularFirestoreModule],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
