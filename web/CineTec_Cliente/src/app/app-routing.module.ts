import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ImageClientComponent } from './client/client.components';
import { SeatingComponent } from './movie_client/movie_client.component.';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'client', component: ImageClientComponent},
  { path: 'movie', component: SeatingComponent},
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
