import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampionListComponent } from './components/champion-list/champion-list.component';
import { ChampionDetailComponent } from './components/champion-detail/champion-detail.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: '', component: ChampionListComponent }, // Home page
  { path: 'champion/:id', component: ChampionDetailComponent }, // Champion details
  { path: 'search', component: SearchComponent }, // Search page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
