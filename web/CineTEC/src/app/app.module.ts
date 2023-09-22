import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminEditorComponent } from './admin-editor/admin-editor.component';

import { AdminLoginService } from './services/admin-login.service';
import { AdminEditorService } from './services/admin-editor.service';

/* The `@NgModule` decorator is used to define a module in Angular. It is a metadata object that specifies how the module should be compiled and run. */
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AdminLoginComponent,
    AdminEditorComponent,
  ],
  providers: [AdminLoginService, AdminEditorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
