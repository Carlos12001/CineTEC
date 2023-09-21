import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ImageClientComponent } from './client/client.components';
import { SeatingComponent } from './movie_client/movie_client.component.';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ImageClientComponent,
    SeatingComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
