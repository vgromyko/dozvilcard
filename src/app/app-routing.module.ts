import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { CardComponent } from './card/card.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { VisitorsComponent } from './visitors/visitors.component';


const routes:  Routes = [
  {path: '', redirectTo: '/card', pathMatch:'full'},
  {path: 'profile', component: ProfileComponent},
  {path: 'card', component: CardComponent},
  {path: 'visitors', component: VisitorsComponent},
  {path: "**", component: PageNotFoundComponent}
];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
