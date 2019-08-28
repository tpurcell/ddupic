import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {FooterBarComponent} from './footer-bar/footer-bar.component';
import {NewDdupicComponent} from './new-ddupic/new-ddupic.component';
import {ListDdupicsComponent} from './list-ddupics/list-ddupics.component';
import {DdupicActionsComponent} from './ddupic-actions/ddupic-actions.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: ListDdupicsComponent},
      {path: 'newddupic', component: NewDdupicComponent},
      {path: 'ddupicactions/:ddupicName', component: DdupicActionsComponent},
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    FooterBarComponent,
    NewDdupicComponent,
    ListDdupicsComponent,
    DdupicActionsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
