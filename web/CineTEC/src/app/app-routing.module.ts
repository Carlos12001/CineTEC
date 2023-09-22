import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminEditorComponent } from './admin-editor/admin-editor.component';

/* The `routes` constant is an array of route objects that define the routing configuration for the Angular application. Each route object has a `path` property that specifies the URL path and a `component` property that specifies the component to be rendered when the URL matches the path. */
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'admin',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: AdminLoginComponent },
      { path: 'editor', component: AdminEditorComponent },
      { path: '**', redirectTo: 'login' },
    ],
  },
  { path: '**', redirectTo: '/home' },
];

/* The `@NgModule` decorator is used to define a module in Angular. In this case, it is defining the `AppRoutingModule` module. */
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
